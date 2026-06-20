CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  -- password is a salted PBKDF2 hash, never plaintext.
  password TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  -- 'writer' | 'editor' | 'admin'
  role TEXT DEFAULT 'writer',
  status TEXT DEFAULT 'active', -- 'active' | 'suspended'
  created_at DATETIME,
  last_login_at DATETIME
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  -- 'pending_review' | 'claimed' | 'returned' | 'denied' | 'published' | 'censored'
  status TEXT DEFAULT 'pending_review',
  -- username of the editor/admin who has this article claimed for review.
  -- NULL when nobody has claimed it (i.e. status = 'pending_review').
  claimed_by TEXT,
  -- instructions on return, or reason on denial. Shown to the writer.
  review_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions: issued on login, required for every /api/admin/* and /api/editor/* route.
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_logs_username ON logs(username);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author);
CREATE INDEX IF NOT EXISTS idx_articles_claimed_by ON articles(claimed_by);