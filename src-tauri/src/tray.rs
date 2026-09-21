use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Emitter, Manager,
};

pub fn setup_tray(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let toggle_item = MenuItem::with_id(app, "toggle", "Abrir / Ocultar (Super+A)", true, None::<&str>)?;
    let history_item = MenuItem::with_id(app, "history", "Histórico (Ctrl+H)", true, None::<&str>)?;
    let settings_item = MenuItem::with_id(app, "settings", "Configurações (Ctrl+,)", true, None::<&str>)?;
    let separator_1 = PredefinedMenuItem::separator(app)?;
    let separator_2 = PredefinedMenuItem::separator(app)?;
    let quit_item = MenuItem::with_id(app, "quit", "Sair do OmniCmd", true, None::<&str>)?;

    let menu = Menu::with_items(
        app,
        &[
            &toggle_item,
            &separator_1,
            &history_item,
            &settings_item,
            &separator_2,
            &quit_item,
        ],
    )?;

    // Use dedicated crisp 32x32 tray icon, fallback to default window icon
    let icon = match tauri::image::Image::from_bytes(include_bytes!("../icons/32x32.png")) {
        Ok(img) => img,
        Err(_) => match app.default_window_icon() {
            Some(ic) => ic.clone(),
            None => return Err("Failed to load tray icon".into()),
        },
    };

    let _tray = TrayIconBuilder::with_id("omnicmd-tray")
        .tooltip("OmniCmd (Super+A)")
        .icon(icon)
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "toggle" => {
                toggle_window_action(app, None);
            }
            "history" => {
                show_window_and_emit(app, "open-history");
            }
            "settings" => {
                show_window_and_emit(app, "open-settings");
            }
            "quit" => {
                app.exit(0);
            }
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let app = tray.app_handle();
                toggle_window_action(app, None);
            }
        })
        .build(app)?;

    Ok(())
}

fn toggle_window_action(app: &AppHandle, view_event: Option<&str>) {
    if let Some(window) = app.get_webview_window("main") {
        let is_visible = window.is_visible().unwrap_or(false);
        if is_visible && view_event.is_none() {
            let _ = window.hide();
        } else {
            let _ = window.show();
            let _ = window.set_focus();
            if let Some(ev) = view_event {
                let _ = app.emit(ev, ());
            } else {
                let _ = app.emit("palette-opened", ());
            }
        }
    }
}

fn show_window_and_emit(app: &AppHandle, event: &str) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.set_focus();
        let _ = app.emit(event, ());
    }
}
