use crate::ai::{execute_chat_completion, AiRequestPayload, AiResponsePayload};
use crate::db::{DbState, HistoryItem};
use std::collections::HashMap;
use tauri::{AppHandle, Manager, State};

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
    if let Some(window) = app.get_webview_window("main") {
        let is_visible = window.is_visible().unwrap_or(false);
        if is_visible {
            let _ = window.hide();
        } else {
            let _ = window.show();
            let _ = window.set_focus();
        }
    }
    Ok(())
}

#[tauri::command]
pub fn hide_window(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.hide();
    }
    Ok(())
}

#[tauri::command]
pub fn show_window(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.set_focus();
    }
    Ok(())
}
