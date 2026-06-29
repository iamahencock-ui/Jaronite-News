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
  -- Optional banner/thumbnail photo, stored as a base64 data URL.
  -- NULL when no photo was uploaded. Max ~800 KB enforced in the API.
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- Set the first time the article is published (approve or instapublish).
  -- Public lists sort and display by this, falling back to created_at for
  -- rows that predate the column. Existing-install migration:
  --   ALTER TABLE articles ADD COLUMN published_at DATETIME;
  published_at DATETIME
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
-- ============================================================
-- Article photos: optional banner image stored as a base64
-- data URL (e.g. "data:image/jpeg;base64,...").
-- NULL means no photo was attached; the UI falls back to the
-- existing text-only layout in that case.
-- Column added via ALTER TABLE in production:
--   ALTER TABLE articles ADD COLUMN image_url TEXT;
-- The CREATE TABLE above already defines articles without it,
-- so we add it here for new installs and document the migration.
-- ============================================================
-- For new installs the column is included in the CREATE TABLE.
-- For existing installs run:
--   ALTER TABLE articles ADD COLUMN image_url TEXT;

-- ============================================================
-- Ad System (Step 1)
-- Run: wrangler d1 execute jaronite-news-db --remote --file=./schema.sql
-- ============================================================

-- Bids submitted by advertisers via the public /advertise page.
CREATE TABLE IF NOT EXISTS ad_bids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  advertiser_name TEXT NOT NULL,
  contact TEXT NOT NULL,                -- Discord tag, in-game name, etc.
  image_url TEXT NOT NULL,              -- URL to their 300x250 ad image
  dest_url TEXT NOT NULL,               -- click-through URL
  bid_amount REAL NOT NULL,             -- amount in server currency
  target_date TEXT NOT NULL,            -- YYYY-MM-DD
  slot_number INTEGER NOT NULL CHECK(slot_number IN (1,2,3)),
  -- Long random payment reference used in the in-game memo (bid:<pay_ref>).
  -- Unguessable so nobody can pay against someone else's bid; the webhook
  -- matches incoming payments on this. The numeric id stays for staff display.
  pay_ref TEXT,
  email TEXT,                           -- advertiser email for automated notifications
  discord_username TEXT,                -- advertiser Discord username for bot DMs
  -- Public (self-serve) bidding double-confirmation. On submission we email a
  -- confirmation link and DM a confirmation link; clicking each stamps the
  -- matching *_verified_at. A bid only competes once BOTH are verified, which
  -- proves the bidder controls the email address and the Discord account.
  email_token TEXT,
  email_verified_at DATETIME,
  discord_token TEXT,
  discord_verified_at DATETIME,
  status TEXT DEFAULT 'pending',        -- 'pending' | 'won' | 'lost'
  -- Payment tracking (DC Economy webhook integration).
  -- payment_status: 'unpaid' | 'awaiting_payment' | 'paid' | 'overpaid' | 'underpaid'
  payment_status TEXT DEFAULT 'unpaid',
  payment_txn_id TEXT,                  -- DC Economy txnId
  payment_received_at DATETIME,
  payment_amount_received REAL,
  -- Set when a win notification (email and/or Discord DM) was successfully
  -- delivered for this bid — by the award cron or the manual re-send action.
  -- NULL means the winner has not been successfully notified yet.
  notified_at DATETIME,
  -- Billing is per-view: the advertiser owes bid_amount (the per-view rate)
  -- multiplied by the views (ad_slots.impressions) the ad actually got.
  -- After the ad runs, the invoice cron computes and stores that total here
  -- and stamps invoiced_at when the invoice email/DM is sent. The payment
  -- webhook matches an incoming payment against amount_owed.
  amount_owed REAL,
  invoiced_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Winning ads scheduled per day per slot.
-- Populated by the 8PM cron after awarding bids.
CREATE TABLE IF NOT EXISTS ad_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slot_number INTEGER NOT NULL CHECK(slot_number IN (1,2,3)),
  run_date TEXT NOT NULL,               -- YYYY-MM-DD
  bid_id INTEGER NOT NULL REFERENCES ad_bids(id),
  advertiser_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  image_url TEXT NOT NULL,
  dest_url TEXT NOT NULL,
  bid_amount REAL NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  UNIQUE(slot_number, run_date)
);

-- Per-event log for impressions and clicks (billing evidence).
CREATE TABLE IF NOT EXISTS ad_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad_slot_id INTEGER NOT NULL REFERENCES ad_slots(id),
  event_type TEXT NOT NULL CHECK(event_type IN ('impression','click')),
  visitor_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ad_bids_target_date ON ad_bids(target_date);
CREATE INDEX IF NOT EXISTS idx_ad_bids_status ON ad_bids(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ad_bids_pay_ref ON ad_bids(pay_ref);
CREATE INDEX IF NOT EXISTS idx_ad_slots_run_date ON ad_slots(run_date);
CREATE INDEX IF NOT EXISTS idx_ad_events_slot ON ad_events(ad_slot_id);

-- ============================================================
-- Payment tracking (webhook integration with DC Economy API)
-- ============================================================
--
-- The payment columns (payment_status, payment_txn_id,
-- payment_received_at, payment_amount_received) AND the advertiser
-- columns (email, discord_username) are now part of the
-- `CREATE TABLE ad_bids` definition above, so a FRESH install gets
-- them automatically when you run this file.
--
-- EXISTING installs: because `CREATE TABLE IF NOT EXISTS` skips a
-- table that already exists, re-running this file will NOT add the
-- new columns to an ad_bids table created before these were added.
-- SQLite has no `ADD COLUMN IF NOT EXISTS`, and D1 aborts a file on
-- the first error — so these ALTERs are intentionally kept OUT of
-- this file (a duplicate-column error would abort the whole run).
--
-- Run each line below ONCE, by hand, only for an existing install
-- that predates these columns. Skip any that already exist (you'll
-- get a harmless "duplicate column name" error if you re-run one):
--
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN payment_status TEXT DEFAULT 'unpaid'"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN payment_txn_id TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN payment_received_at DATETIME"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN payment_amount_received REAL"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN email TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN discord_username TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN notified_at DATETIME"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN amount_owed REAL"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN invoiced_at DATETIME"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN email_token TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN email_verified_at DATETIME"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN discord_token TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN pay_ref TEXT"
--   npx wrangler d1 execute jaronite-news-db --remote --command "CREATE UNIQUE INDEX IF NOT EXISTS idx_ad_bids_pay_ref ON ad_bids(pay_ref)"
--   npx wrangler d1 execute jaronite-news-db --remote --command "ALTER TABLE ad_bids ADD COLUMN discord_verified_at DATETIME"
--
-- Verify afterward with:
--   npx wrangler d1 execute jaronite-news-db --remote --command "PRAGMA table_info(ad_bids)"

-- Deduplication table for incoming webhook deliveries.
-- DC Economy uses at-least-once delivery; we store every deliveryId we've
-- already processed so duplicate POSTs are safely ignored.
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  delivery_id TEXT UNIQUE NOT NULL,   -- X-Treasury-Delivery-Id header value
  txn_id TEXT,                        -- transaction id from payload
  processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_delivery_id ON webhook_deliveries(delivery_id);

-- ============================================================
-- Advertiser Discord verification (public self-serve bidding).
-- When someone connects their Discord via OAuth on the /advertise page and
-- is confirmed to be a member of our server, we store a short-lived token
-- here. The bid form sends that token; the bid endpoint trusts the
-- server-side discord identity recorded here (never client-supplied input).
-- ============================================================
CREATE TABLE IF NOT EXISTS ad_verifications (
  token TEXT PRIMARY KEY,
  discord_id TEXT NOT NULL,          -- verified Discord user id (snowflake)
  discord_username TEXT NOT NULL,    -- verified Discord display/global name
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL       -- token good for ~30 min after OAuth
);

CREATE INDEX IF NOT EXISTS idx_ad_verifications_expires ON ad_verifications(expires_at);