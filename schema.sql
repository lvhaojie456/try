CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    best_floor INTEGER NOT NULL DEFAULT 1 CHECK (best_floor >= 1),
    best_floor_easy INTEGER NOT NULL DEFAULT 1 CHECK (best_floor_easy >= 1),
    best_floor_hard INTEGER NOT NULL DEFAULT 1 CHECK (best_floor_hard >= 1),
    password_salt TEXT,
    password_hash TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_best_floor
ON users (best_floor DESC, updated_at ASC);

CREATE INDEX IF NOT EXISTS idx_users_best_floor_easy
ON users (best_floor_easy DESC, updated_at ASC);

CREATE INDEX IF NOT EXISTS idx_users_best_floor_hard
ON users (best_floor_hard DESC, updated_at ASC);
