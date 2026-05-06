ALTER TABLE users ADD COLUMN best_floor_easy INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN best_floor_hard INTEGER NOT NULL DEFAULT 1;

UPDATE users
SET best_floor_hard = CASE
    WHEN best_floor_hard < best_floor THEN best_floor
    ELSE best_floor_hard
END;

CREATE INDEX IF NOT EXISTS idx_users_best_floor_easy
ON users (best_floor_easy DESC, updated_at ASC);

CREATE INDEX IF NOT EXISTS idx_users_best_floor_hard
ON users (best_floor_hard DESC, updated_at ASC);
