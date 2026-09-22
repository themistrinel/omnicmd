use crate::ai::{execute_chat_completion, AiRequestPayload, AiResponsePayload};
use crate::db::{DbState, HistoryItem};
use std::collections::HashMap;
use tauri::{AppHandle, State};

#[tauri::command]
pub fn db_save_history(state: State<'_, DbState>, item: HistoryItem) -> Result<i64, String> {
    state.save_history(item)
}

#[tauri::command]
pub fn db_get_history(
    state: State<'_, DbState>,
    limit: Option<i64>,
    search: Option<String>,
) -> Result<Vec<HistoryItem>, String> {
    state.get_history(limit.unwrap_or(50), search)
}

#[tauri::command]
pub fn db_delete_history(state: State<'_, DbState>, id: i64) -> Result<(), String> {
    state.delete_history(id)
}

#[tauri::command]
pub fn db_clear_history(state: State<'_, DbState>) -> Result<(), String> {
    state.clear_history()
}

#[tauri::command]
pub fn db_get_settings(state: State<'_, DbState>) -> Result<HashMap<String, String>, String> {
    state.get_settings()
}

#[tauri::command]
pub fn db_set_setting(state: State<'_, DbState>, key: String, value: String) -> Result<(), String> {
    state.set_setting(&key, &value)
}

#[tauri::command]
pub async fn execute_ai_request(payload: AiRequestPayload) -> Result<AiResponsePayload, String> {
    execute_chat_completion(payload).await
}

#[tauri::command]
pub fn toggle_window(app: AppHandle) -> Result<(), String> {
    crate::toggle_main_window(&app);
    Ok(())
}

#[tauri::command]
pub fn hide_window(app: AppHandle) -> Result<(), String> {
    crate::hide_main_window(&app);
    Ok(())
}

#[tauri::command]
pub fn show_window(app: AppHandle) -> Result<(), String> {
    crate::activate_and_show_window(&app, None);
    Ok(())
}

#[tauri::command]
pub fn restart_app(app: AppHandle) {
    app.restart();
}

#[tauri::command]
pub fn copy_to_clipboard(app: AppHandle, text: String) -> Result<(), String> {
    #[cfg(target_os = "linux")]
    {
        use std::io::Write;
        use std::process::{Command, Stdio};

        // 1. Wayland nativo: wl-copy garante persistência mesmo após a janela perder foco ou fechar no Hyprland
        if let Ok(mut child) = Command::new("wl-copy")
            .stdin(Stdio::piped())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
        {
            if let Some(mut stdin) = child.stdin.take() {
                let _ = stdin.write_all(text.as_bytes());
            }
            if let Ok(status) = child.wait() {
                if status.success() {
                    return Ok(());
                }
            }
        }

        // 2. Fallback X11: xclip se disponível
        if let Ok(mut child) = Command::new("xclip")
            .args(["-selection", "clipboard"])
            .stdin(Stdio::piped())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
        {
            if let Some(mut stdin) = child.stdin.take() {
                let _ = stdin.write_all(text.as_bytes());
            }
            if let Ok(status) = child.wait() {
                if status.success() {
                    return Ok(());
                }
            }
        }
    }

    // 3. Plugin padrão do Tauri (macOS, Windows ou fallback Linux)
    use tauri_plugin_clipboard_manager::ClipboardExt;
    app.clipboard()
        .write_text(text)
        .map_err(|e| format!("Failed to write to clipboard: {}", e))
}

#[tauri::command]
pub fn read_from_clipboard(app: AppHandle) -> Result<String, String> {
    #[cfg(target_os = "linux")]
    {
        use std::process::Command;

        // 1. Wayland nativo: wl-paste
        if let Ok(output) = Command::new("wl-paste")
            .arg("--no-newline")
            .output()
        {
            if output.status.success() {
                if let Ok(s) = String::from_utf8(output.stdout) {
                    return Ok(s);
                }
            }
        }

        // 2. Fallback X11: xclip
        if let Ok(output) = Command::new("xclip")
            .args(["-selection", "clipboard", "-o"])
            .output()
        {
            if output.status.success() {
                if let Ok(s) = String::from_utf8(output.stdout) {
                    return Ok(s);
                }
            }
        }
    }

    // 3. Plugin padrão do Tauri
    use tauri_plugin_clipboard_manager::ClipboardExt;
    app.clipboard()
        .read_text()
        .map_err(|e| format!("Failed to read clipboard: {}", e))
}
