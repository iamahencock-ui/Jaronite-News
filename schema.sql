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
  -- username of the editor/admin who approved this article for publication.
  -- NULL means it was published via instapublish (self-published, no reviewer) —
  -- distinguish that from "claimed_by was never set" by checking status/author.
  reviewed_by TEXT,
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

-- ============================================================
-- Public reader accounts (Discord OAuth2). Deliberately a separate
-- table from `users` (staff): different trust level, different auth
-- method (Discord-issued identity, no local password ever stored),
-- and keeping them apart means a bug in one auth path can't leak
-- into the other's permissions.
-- ============================================================
CREATE TABLE IF NOT EXISTS discord_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discord_id TEXT UNIQUE NOT NULL,      -- Discord's permanent numeric user ID (snowflake)
  username TEXT NOT NULL,               -- Discord display/global username at last login
  avatar_hash TEXT,                     -- Discord avatar hash, used to build avatar URL
  status TEXT DEFAULT 'active',         -- 'active' | 'banned' (lets admins moderate commenters)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME
);

-- Sessions for Discord-authenticated public readers. Kept separate from
-- the staff `sessions` table so a reader session and a staff session are
-- never structurally interchangeable, and so each can be invalidated,
-- queried, or expired independently.
CREATE TABLE IF NOT EXISTS discord_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,
  discord_user_id INTEGER NOT NULL REFERENCES discord_users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL REFERENCES articles(id),
  discord_user_id INTEGER NOT NULL REFERENCES discord_users(id),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'visible',  -- 'visible' | 'removed' (soft-delete, e.g. moderation)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  discord_user_id INTEGER NOT NULL REFERENCES discord_users(id),
  article_id INTEGER NOT NULL REFERENCES articles(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(discord_user_id, article_id)  -- can't favorite the same article twice
);

-- ============================================================
-- Analytics: one row per article view (modal open). Built from
-- scratch — every field is something a real client can report
-- without invasive tracking (no IP geolocation lookups, no
-- fingerprinting libraries; just what the browser already exposes).
-- ============================================================
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL REFERENCES articles(id),
  visitor_id TEXT NOT NULL,        -- random ID generated client-side, stored in a cookie; identifies a return visitor without PII
  referrer TEXT,                   -- document.referrer at view time ('' for direct/typed traffic)
  referrer_domain TEXT,            -- parsed hostname from referrer, precomputed for fast GROUP BY
  user_agent TEXT,                 -- raw UA string (kept for completeness; parsed into device/browser/os below)
  device_type TEXT,                -- 'mobile' | 'tablet' | 'desktop'
  browser TEXT,                    -- 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Other'
  os TEXT,                         -- 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'Other'
  is_discord_user INTEGER DEFAULT 0,  -- 1 if the viewer was logged in via Discord at view time
  read_seconds INTEGER DEFAULT 0,  -- updated via a heartbeat ping while the article is open (see /api/analytics/ping)
  max_scroll_pct INTEGER DEFAULT 0, -- deepest scroll position reached in the modal, 0-100
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_discord_users_discord_id ON discord_users(discord_id);
CREATE INDEX IF NOT EXISTS idx_discord_sessions_token ON discord_sessions(token);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_favorites_discord_user_id ON favorites(discord_user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON favorites(article_id);
CREATE INDEX IF NOT EXISTS idx_page_views_article_id ON page_views(article_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);