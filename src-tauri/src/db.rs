use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HistoryItem {
    pub id: Option<i64>,
    pub action_id: String,
    pub action_title: String,
    pub model: String,
    pub profile_id: String,
    pub input_text: String,
    pub output_text: String,
    pub created_at: Option<String>,
}

pub struct DbState {
    pub conn: Mutex<Connection>,
}

impl DbState {
    pub fn new(app_handle: &AppHandle) -> Result<Self, String> {
        let app_dir: PathBuf = match app_handle.path().app_data_dir() {
            Ok(dir) => dir,
            Err(_) => {
                // Fallback to local config if app_data_dir fails
                let home = std::env::var("HOME").unwrap_or_else(|_| ".".to_string());
                let new_dir = PathBuf::from(&home).join(".local").join("share").join("omnicmd");
                let legacy_dir = PathBuf::from(&home).join(".local").join("share").join("ai-commander");
                if legacy_dir.exists() && !new_dir.exists() {
                    let _ = fs::rename(&legacy_dir, &new_dir);
                }
                new_dir
            }
        };

        if !app_dir.exists() {
            fs::create_dir_all(&app_dir)
                .map_err(|e| format!("Failed to create app data directory: {}", e))?;
        }

        let legacy_db_path = app_dir.join("ai-commander.db");
        let db_path = app_dir.join("omnicmd.db");
        if legacy_db_path.exists() && !db_path.exists() {
            let _ = fs::rename(&legacy_db_path, &db_path);
        }
        let conn = Connection::open(&db_path)
            .map_err(|e| format!("Failed to open SQLite database: {}", e))?;

        // Initialize tables
        conn.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action_id TEXT NOT NULL,
                action_title TEXT NOT NULL,
                model TEXT NOT NULL,
                profile_id TEXT NOT NULL,
                input_text TEXT NOT NULL,
                output_text TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);

            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );
            ",
        )
        .map_err(|e| format!("Failed to run DB migrations: {}", e))?;

        Ok(DbState {
            conn: Mutex::new(conn),
        })
    }

    pub fn save_history(&self, item: HistoryItem) -> Result<i64, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO history (action_id, action_title, model, profile_id, input_text, output_text)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            params![
                item.action_id,
                item.action_title,
                item.model,
                item.profile_id,
                item.input_text,
                item.output_text
            ],
        )
        .map_err(|e| format!("Failed to insert history item: {}", e))?;

        Ok(conn.last_insert_rowid())
    }

    pub fn get_history(&self, limit: i64, search: Option<String>) -> Result<Vec<HistoryItem>, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let mut items = Vec::new();

        if let Some(query) = search {
            let filter = format!("%{}%", query.trim());
            let mut stmt = conn
                .prepare(
                    "SELECT id, action_id, action_title, model, profile_id, input_text, output_text, created_at
                     FROM history
                     WHERE input_text LIKE ?1 OR output_text LIKE ?2 OR action_title LIKE ?3
                     ORDER BY id DESC LIMIT ?4",
                )
                .map_err(|e| e.to_string())?;

            let rows = stmt
                .query_map(params![filter, filter, filter, limit], |row| {
                    Ok(HistoryItem {
                        id: Some(row.get(0)?),
                        action_id: row.get(1)?,
                        action_title: row.get(2)?,
                        model: row.get(3)?,
                        profile_id: row.get(4)?,
                        input_text: row.get(5)?,
                        output_text: row.get(6)?,
                        created_at: Some(row.get(7)?),
                    })
                })
                .map_err(|e| e.to_string())?;

            for item in rows {
                if let Ok(entry) = item {
                    items.push(entry);
                }
            }
        } else {
            let mut stmt = conn
                .prepare(
                    "SELECT id, action_id, action_title, model, profile_id, input_text, output_text, created_at
                     FROM history
                     ORDER BY id DESC LIMIT ?1",
                )
                .map_err(|e| e.to_string())?;

            let rows = stmt
                .query_map(params![limit], |row| {
                    Ok(HistoryItem {
                        id: Some(row.get(0)?),
                        action_id: row.get(1)?,
                        action_title: row.get(2)?,
                        model: row.get(3)?,
                        profile_id: row.get(4)?,
                        input_text: row.get(5)?,
                        output_text: row.get(6)?,
                        created_at: Some(row.get(7)?),
                    })
                })
                .map_err(|e| e.to_string())?;

            for item in rows {
                if let Ok(entry) = item {
                    items.push(entry);
                }
            }
        }

        Ok(items)
    }

    pub fn delete_history(&self, id: i64) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM history WHERE id = ?1", params![id])
            .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn clear_history(&self) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM history", [])
            .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn set_setting(&self, key: &str, value: &str) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO settings (key, value) VALUES (?1, ?2)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            params![key, value],
        )
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn get_settings(&self) -> Result<HashMap<String, String>, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let mut stmt = conn
            .prepare("SELECT key, value FROM settings")
            .map_err(|e| e.to_string())?;

        let rows = stmt
            .query_map([], |row| Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?)))
            .map_err(|e| e.to_string())?;

        let mut map = HashMap::new();
        for row in rows {
            if let Ok((k, v)) = row {
                map.insert(k, v);
            }
        }

        Ok(map)
    }
}
