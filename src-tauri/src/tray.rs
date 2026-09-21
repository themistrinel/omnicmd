use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle,
};

pub fn setup_tray(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    #[cfg(target_os = "windows")]
    let toggle_title = "Abrir / Ocultar (Alt+Space)";
    #[cfg(target_os = "macos")]
    let toggle_title = "Abrir / Ocultar (⌥ Space)";
    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    let toggle_title = "Abrir / Ocultar (Super+A)";

    #[cfg(target_os = "windows")]
    let tooltip_text = "OmniCmd (Alt+Space)";
    #[cfg(target_os = "macos")]
    let tooltip_text = "OmniCmd (⌥ Space)";
    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    let tooltip_text = "OmniCmd (Super+A)";

    let toggle_item = MenuItem::with_id(app, "toggle", toggle_title, true, None::<&str>)?;
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
        .tooltip(tooltip_text)
        .icon(icon)
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "toggle" => {
                crate::toggle_main_window(app);
            }
            "history" => {
                crate::activate_and_show_window(app, Some("open-history"));
            }
            "settings" => {
                crate::activate_and_show_window(app, Some("open-settings"));
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
                crate::toggle_main_window(app);
            }
        })
        .build(app)?;

    Ok(())
}
