// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

fn main() {
    #[cfg(target_os = "linux")]
    {
        // Fix for WebKitGTK on Wayland / Hyprland:
        // The DMABUF renderer in WebKitGTK prevents alpha transparency from blending with Wayland compositors.
        // Disabling it ensures proper RGBA alpha transparency and compositor blur.
        if std::env::var("WEBKIT_DISABLE_DMABUF_RENDERER").is_err() {
            std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
        }
    }

    let args: Vec<String> = env::args().collect();
    let is_toggle = args.iter().any(|a| a == "--toggle" || a == "-t" || a == "toggle");

    if is_toggle {
        // Try to toggle existing running instance
        if app_lib::send_command("toggle") {
            return;
        }
    } else {
        // If launched normally, check if an instance is already running
        // If so, just bring it to front instead of crashing on port or opening duplicates
        if app_lib::send_command("show") {
            return;
        }
    }

    app_lib::run();
}
