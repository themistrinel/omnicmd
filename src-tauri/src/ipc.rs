#[cfg(unix)]
use std::fs;
#[cfg(unix)]
use std::io::{BufRead, BufReader, Write};
#[cfg(unix)]
use std::os::unix::net::{UnixListener, UnixStream};
#[cfg(unix)]
use std::path::PathBuf;
#[cfg(unix)]
use std::time::Duration;

#[cfg(windows)]
use std::fs;
#[cfg(windows)]
use std::io::{BufRead, BufReader, Write};
#[cfg(windows)]
use std::net::{TcpListener, TcpStream};
#[cfg(windows)]
use std::path::PathBuf;
#[cfg(windows)]
use std::time::Duration;

pub fn dispatch_ipc_command(handle: &tauri::AppHandle, cmd: &str) {
    if cmd == "ping" {
        // No-op for healthcheck / handshake
    } else if cmd == "toggle" || cmd.is_empty() {
        crate::toggle_main_window(handle);
    } else if cmd == "show" {
        crate::activate_and_show_window(handle, None);
    } else if cmd == "settings" {
        crate::activate_and_show_window(handle, Some("open-settings"));
    } else if cmd == "history" {
        crate::activate_and_show_window(handle, Some("open-history"));
    } else if cmd == "hide" {
        crate::hide_main_window(handle);
    }
}

#[cfg(unix)]
pub fn get_socket_path() -> PathBuf {
    if let Ok(runtime_dir) = std::env::var("XDG_RUNTIME_DIR") {
        PathBuf::from(runtime_dir).join("omnicmd.sock")
    } else {
        let user = std::env::var("USER").unwrap_or_else(|_| "default".to_string());
        PathBuf::from("/tmp").join(format!("omnicmd-{}.sock", user))
    }
}

#[cfg(unix)]
pub fn send_command(cmd: &str) -> bool {
    let socket_path = get_socket_path();
    if let Ok(mut stream) = UnixStream::connect(&socket_path) {
        let _ = stream.set_read_timeout(Some(Duration::from_millis(500)));
        let _ = stream.set_write_timeout(Some(Duration::from_millis(300)));
        if writeln!(stream, "{}", cmd).is_ok() {
            let mut reader = BufReader::new(stream);
            let mut ack = String::new();
            if reader.read_line(&mut ack).is_ok() && ack.trim() == "OMNICMD_OK" {
                return true;
            }
        }
    }
    false
}

#[cfg(unix)]
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
                let _ = stream.set_read_timeout(Some(Duration::from_secs(1)));
                let mut reader = BufReader::new(stream.try_clone().unwrap_or_else(|_| stream));
                let mut line = String::new();
                if reader.read_line(&mut line).is_ok() {
                    let cmd = line.trim();
                    dispatch_ipc_command(&handle, cmd);
                    let _ = writeln!(reader.get_mut(), "OMNICMD_OK");
                }
            }
        }
    });
}

#[cfg(windows)]
fn get_port_file() -> PathBuf {
    std::env::temp_dir().join("omnicmd.port")
}

#[cfg(windows)]
pub fn send_command(cmd: &str) -> bool {
    let port_file = get_port_file();
    if let Ok(content) = fs::read_to_string(&port_file) {
        if let Ok(port) = content.trim().parse::<u16>() {
            let addr = std::net::SocketAddr::from(([127, 0, 0, 1], port));
            if let Ok(mut stream) = TcpStream::connect_timeout(&addr, Duration::from_millis(300)) {
                let _ = stream.set_read_timeout(Some(Duration::from_millis(500)));
                let _ = stream.set_write_timeout(Some(Duration::from_millis(300)));
                if writeln!(stream, "{}", cmd).is_ok() {
                    let mut reader = BufReader::new(stream);
                    let mut ack = String::new();
                    if reader.read_line(&mut ack).is_ok() && ack.trim() == "OMNICMD_OK" {
                        return true;
                    }
                }
            }
            // If connection failed or handshake was invalid, port file is stale: remove it
            let _ = fs::remove_file(&port_file);
        }
    }
    false
}

#[cfg(windows)]
pub fn start_ipc_server(handle: tauri::AppHandle) {
    let listener = match TcpListener::bind("127.0.0.1:0") {
        Ok(l) => l,
        Err(e) => {
            log::warn!("Failed to bind local loopback TCP for Windows IPC: {}", e);
            return;
        }
    };

    if let Ok(addr) = listener.local_addr() {
        let port_file = get_port_file();
        let _ = fs::write(&port_file, addr.port().to_string());
        log::info!("OmniCmd Windows IPC listening on 127.0.0.1:{}", addr.port());
    }

    std::thread::spawn(move || {
        for stream in listener.incoming() {
            if let Ok(mut stream) = stream {
                let _ = stream.set_read_timeout(Some(Duration::from_secs(1)));
                let mut reader = BufReader::new(stream.try_clone().unwrap_or_else(|_| stream));
                let mut line = String::new();
                if reader.read_line(&mut line).is_ok() {
                    let cmd = line.trim();
                    dispatch_ipc_command(&handle, cmd);
                    let _ = writeln!(reader.get_mut(), "OMNICMD_OK");
                }
            }
        }
    });
}

#[cfg(not(any(unix, windows)))]
pub fn send_command(_cmd: &str) -> bool {
    false
}

#[cfg(not(any(unix, windows)))]
pub fn start_ipc_server(_handle: tauri::AppHandle) {
}
