mod ai;
mod commands;
mod db;
pub mod ipc;
mod tray;

use db::DbState;
use tauri::{Emitter, Manager};
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut, ShortcutState};

pub use ipc::send_command;

/// Activates, unminimizes, shows and gives focus to the main window across all OS platforms
pub fn activate_and_show_window(app: &tauri::AppHandle, event_to_emit: Option<&str>) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();

        #[cfg(target_os = "macos")]
        {
            // Ensure app process is active to receive keyboard input on macOS
            let _ = app.show();
        }

        if let Some(ev) = event_to_emit {
            let _ = app.emit(ev, ());
        } else {
            let _ = app.emit("palette-opened", ());
        }
    }
}

/// Hides the main window
pub fn hide_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.hide();
    }
}

/// Seamlessly toggles the main window visibility with proper focus handling
pub fn toggle_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let is_visible = window.is_visible().unwrap_or(false);
        if is_visible {
            let _ = window.hide();
        } else {
            activate_and_show_window(app, None);
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();

            // Initialize SQLite DB
            let db_state = DbState::new(&handle)
                .map_err(|e| Box::<dyn std::error::Error>::from(e))?;
            app.manage(db_state);

            // Initialize System Tray for desktop status area
            if let Err(e) = tray::setup_tray(&handle) {
                log::warn!("Could not initialize system tray: {}", e);
            }

            // Start cross-platform IPC server (Unix Domain Socket on Unix/Linux/macOS, Local TCP on Windows)
            ipc::start_ipc_server(handle.clone());

            // Multiplatform Global Shortcut Registration:
            // - Windows: Alt+Space is the standard launcher hotkey (avoids Win+A / Win+Space reserved by Windows Shell)
            // - macOS: Alt+Space (Option+Space) is standard for launchers (Alfred/Raycast) avoiding Cmd+Space (Spotlight)
            // - Linux: Super+A, Super+Space, Alt+Space, Ctrl+Space for X11/XWayland (Wayland uses IPC toggle)
            #[cfg(target_os = "windows")]
            let shortcuts_to_try = ["alt+space", "ctrl+space", "ctrl+shift+space", "alt+a"];

            #[cfg(target_os = "macos")]
            let shortcuts_to_try = ["alt+space", "ctrl+space", "command+shift+space", "ctrl+alt+space"];

            #[cfg(not(any(target_os = "windows", target_os = "macos")))]
            let shortcuts_to_try = ["super+a", "super+space", "alt+space", "ctrl+space"];

            let mut registered = false;

            for sc_str in &shortcuts_to_try {
                if let Ok(shortcut) = sc_str.parse::<Shortcut>() {
                    let h = handle.clone();
                    let res = handle.global_shortcut().on_shortcut(shortcut, move |_app, _sc, event| {
                        if event.state() == ShortcutState::Pressed {
                            toggle_main_window(&h);
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
                log::info!("Global shortcut hook not active directly via window system (expected on Wayland/Hyprland; IPC daemon active)");
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
            commands::restart_app,
            commands::copy_to_clipboard,
            commands::read_from_clipboard,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
