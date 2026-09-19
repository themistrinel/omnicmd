mod ai;
mod commands;
mod db;
pub mod ipc;
mod tray;

use db::DbState;
use tauri::{Emitter, Manager};
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut, ShortcutState};

pub use ipc::send_command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();

            // Initialize SQLite DB
            let db_state = DbState::new(&handle)
                .map_err(|e| Box::<dyn std::error::Error>::from(e))?;
            app.manage(db_state);

            // Initialize System Tray for Waybar / Desktop status area
            if let Err(e) = tray::setup_tray(&handle) {
                log::warn!("Could not initialize system tray: {}", e);
            }

            // Start UNIX domain socket IPC server for instant Wayland / Hyprland toggles
            ipc::start_ipc_server(handle.clone());

            // Setup global shortcut: Try "Super+Space" then fallback to "Ctrl+Space" or "Alt+Space"
            let shortcuts_to_try = ["super+space", "ctrl+space", "alt+space"];
            let mut registered = false;

            for sc_str in &shortcuts_to_try {
                if let Ok(shortcut) = sc_str.parse::<Shortcut>() {
                    let h = handle.clone();
                    let res = handle.global_shortcut().on_shortcut(shortcut, move |_app, _sc, event| {
                        if event.state() == ShortcutState::Pressed {
                            if let Some(window) = h.get_webview_window("main") {
                                let is_visible = window.is_visible().unwrap_or(false);
                                if is_visible {
                                    let _ = window.hide();
                                } else {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                    let _ = h.emit("palette-opened", ());
                                }
                            }
                        }
                    });

                    if res.is_ok() {
                        registered = true;
                        log::info!("Registered global shortcut: {}", sc_str);
                        break;
                    }
                }
            }

            if !registered {
                log::info!("Global shortcut hook via X11 not active (normal in Wayland/Hyprland; use --toggle binding)");
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::db_save_history,
            commands::db_get_history,
            commands::db_delete_history,
            commands::db_clear_history,
            commands::db_get_settings,
            commands::db_set_setting,
            commands::execute_ai_request,
            commands::toggle_window,
            commands::hide_window,
            commands::show_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
