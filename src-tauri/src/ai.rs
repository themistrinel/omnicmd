use serde::{Deserialize, Serialize};
use std::time::Duration;

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: String,
    pub content: serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AiRequestPayload {
    pub endpoint: String,
    pub api_key: String,
    pub model: String,
    pub messages: Vec<ChatMessage>,
    pub temperature: Option<f32>,
    pub max_tokens: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AiResponsePayload {
    pub text: String,
    pub model: String,
    pub usage_tokens: Option<u32>,
}

#[derive(Deserialize)]
struct AssistantMessage {
    content: Option<String>,
}

#[derive(Deserialize)]
struct OpenAiChatChoice {
    message: Option<AssistantMessage>,
    delta: Option<DeltaMessage>,
}

#[derive(Deserialize)]
#[allow(dead_code)]
struct DeltaMessage {
    content: Option<String>,
    reasoning_content: Option<String>,
}

#[derive(Deserialize)]
struct OpenAiChatUsage {
    total_tokens: Option<u32>,
}

#[derive(Deserialize)]
struct OpenAiChatResponse {
    choices: Option<Vec<OpenAiChatChoice>>,
    model: Option<String>,
    usage: Option<OpenAiChatUsage>,
    error: Option<OpenAiErrorDetails>,
}

#[derive(Deserialize)]
struct OpenAiErrorDetails {
    message: String,
}

pub async fn execute_chat_completion(payload: AiRequestPayload) -> Result<AiResponsePayload, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(60))
        .build()
        .map_err(|e| format!("Falha ao criar cliente HTTP: {}", e))?;

    let mut url = payload.endpoint.trim().to_string();
    if url.ends_with('/') {
        url.pop();
    }
    if !url.ends_with("/chat/completions") {
        url = format!("{}/chat/completions", url);
    }

    // Force "stream": false so 9router returns standard JSON completions
    let request_body = serde_json::json!({
        "model": payload.model,
        "messages": payload.messages,
        "temperature": payload.temperature.unwrap_or(0.7),
        "max_tokens": payload.max_tokens.unwrap_or(2048),
        "stream": false
    });

    let mut request = client.post(&url).json(&request_body);
    if !payload.api_key.trim().is_empty() {
        request = request.header("Authorization", format!("Bearer {}", payload.api_key.trim()));
    }
    request = request.header("Content-Type", "application/json");

    let response = request
        .send()
        .await
        .map_err(|e| format!("Erro de rede ao conectar no 9router ({}): {}", url, e))?;

    let status = response.status();
    let body_text = response
        .text()
        .await
        .map_err(|e| format!("Falha ao ler resposta da IA: {}", e))?;

    if !status.is_success() {
        return Err(format!(
            "Erro do Provedor de IA (HTTP {}): {}",
            status.as_u16(),
            body_text
        ));
    }

    let trimmed = body_text.trim();

    // Check if response is SSE (Server-Sent Events) format starting with data:
    if trimmed.starts_with("data:") || trimmed.contains("\ndata:") {
        let mut accumulated_text = String::new();
        let mut model_name = payload.model.clone();
        let mut tokens = None;

        for line in trimmed.lines() {
            let line = line.trim();
            if let Some(json_str) = line.strip_prefix("data:") {
                let json_str = json_str.trim();
                if json_str.is_empty() || json_str == "[DONE]" {
                    continue;
                }
                if let Ok(parsed) = serde_json::from_str::<OpenAiChatResponse>(json_str) {
                    if let Some(m) = parsed.model {
                        model_name = m;
                    }
                    if let Some(u) = parsed.usage {
                        tokens = u.total_tokens;
                    }
                    if let Some(choices) = parsed.choices {
                        for c in choices {
                            if let Some(delta) = c.delta {
                                if let Some(content) = delta.content {
                                    accumulated_text.push_str(&content);
                                }
                            } else if let Some(msg) = c.message {
                                if let Some(content) = msg.content {
                                    accumulated_text.push_str(&content);
                                }
                            }
                        }
                    }
                }
            }
        }

        if !accumulated_text.is_empty() {
            return Ok(AiResponsePayload {
                text: accumulated_text,
                model: model_name,
                usage_tokens: tokens,
            });
        }
    }

    // Standard JSON Response parsing
    let parsed: OpenAiChatResponse = serde_json::from_str(trimmed)
        .map_err(|e| format!("Falha ao processar JSON da resposta: {} (raw: {})", e, trimmed))?;

    if let Some(err) = parsed.error {
        return Err(format!("9router retornou erro: {}", err.message));
    }

    let text = parsed
        .choices
        .and_then(|c| c.into_iter().next())
        .and_then(|c| {
            if let Some(msg) = c.message {
                msg.content
            } else if let Some(delta) = c.delta {
                delta.content
            } else {
                None
            }
        })
        .ok_or_else(|| "9router retornou array de escolhas vazio".to_string())?;

    let total_tokens = parsed.usage.and_then(|u| u.total_tokens);
    let returned_model = parsed.model.unwrap_or(payload.model);

    Ok(AiResponsePayload {
        text,
        model: returned_model,
        usage_tokens: total_tokens,
    })
}
