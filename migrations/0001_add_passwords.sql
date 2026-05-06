ALTER TABLE users ADD COLUMN password_salt TEXT;
ALTER TABLE users ADD COLUMN password_hash TEXT DEFAULT 'legacy:123456';

UPDATE users
SET password_hash = 'legacy:123456'
WHERE password_hash IS NULL;
