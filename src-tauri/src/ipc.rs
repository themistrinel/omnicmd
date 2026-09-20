use std::fs;
use std::io::{BufRead, BufReader, Write};
use std::os::unix::net::{UnixListener, UnixStream};
use std::path::PathBuf;
use tauri::{Emitter, Manager};

pub fn get_socket_path() -> PathBuf {
    if let Ok(runtime_dir) = std::env::var("XDG_RUNTIME_DIR") {
        PathBuf::from(runtime_dir).join("omnicmd.sock")
    } else {
        let user = std::env::var("USER").unwrap_or_else(|_| "default".to_string());
        PathBuf::from("/tmp").join(format!("omnicmd-{}.sock", user))
    }
}

pub fn send_command(cmd: &str) -> bool {
    let socket_path = get_socket_path();
    if let Ok(mut stream) = UnixStream::connect(&socket_path) {
        if writeln!(stream, "{}", cmd).is_ok() {
            return true;
        }
    }
    false
}

pub fn start_ipc_server(handle: tauri::AppHandle) {
    let socket_path = get_socket_path();

    // Remove existing stale socket if present
    if socket_path.exists() {
        let _ = fs::remove_file(&socket_path);
    }

    let listener = match UnixListener::bind(&socket_path) {
        Ok(l) => l,
        Err(e) => {
            log::warn!("Failed to bind UNIX domain socket at {:?}: {}", socket_path, e);
            return;
        }
    };

    log::info!("OmniCmd IPC server listening on {:?}", socket_path);

    std::thread::spawn(move || {
        for stream in listener.incoming() {
            if let Ok(stream) = stream {
                let mut reader = BufReader::new(stream);
                let mut line = String::new();
                if reader.read_line(&mut line).is_ok() {
                    let cmd = line.trim();
                    let h = handle.clone();

                    if cmd == "toggle" || cmd.is_empty() {
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
                    } else if cmd == "show" {
                        if let Some(window) = h.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                            let _ = h.emit("palette-opened", ());
                        }
                    } else if cmd == "hide" {
                        if let Some(window) = h.get_webview_window("main") {
                            let _ = window.hide();
                        }
                    }
                }
            }
        }
    });
}
