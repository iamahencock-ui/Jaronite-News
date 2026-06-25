# Jaronite News Inc.
A simple website for Jaronite News Incorporated in Democracycraft.
Used by the employees of Jaronite News Inc. to upload and write their articles, a news based buisness using this website to operate, in conjuction with a discord based system.

## Website Coding
This website uses and is designed for Cloudflare Pages/Worker and runs on a system of js, html and css for a clean website design. The live site is at: https://jaronitenews.com/ 

## Reader Features (Discord login, comments, favorites)
Public readers can log in with Discord to comment on articles and favorite them
(viewable from a menu in the site header). This is a completely separate
identity system from staff accounts — Discord readers can never access the
staff portal, and staff accounts can't comment/favorite as a "reader."

**One-time setup required before this works:**

1. Apply the schema update (adds `discord_users`, `discord_sessions`,
   `comments`, `favorites`, `page_views`):
   ```
   wrangler d1 execute jaronite-news-db --remote --file=./schema.sql
   ```
   (Safe to re-run — every statement is `CREATE TABLE IF NOT EXISTS`.)

2. Set the Discord OAuth2 secrets (from the Discord Developer Portal →
   your application → OAuth2). **Never put these in `wrangler.toml` or any
   committed file** — they're set as encrypted Worker secrets:
   ```
   wrangler secret put DISCORD_CLIENT_ID
   wrangler secret put DISCORD_CLIENT_SECRET
   ```

3. In the Discord Developer Portal, under OAuth2 → Redirects, add:
   ```
   https://<your-worker-domain>/api/auth/discord/callback
   ```

## Writer Analytics
Every staff account (writer/editor/admin) sees an "Analytics" card in the
portal showing view counts, unique visitors, and average read time for
their own published articles. Editors and admins can switch to a
site-wide view. Clicking any article opens a full dashboard: a views-over-
time chart, top referrers, device/browser/OS breakdown, and read-depth
(how far into the article readers actually scroll).

View data is collected automatically — no setup needed beyond the schema
update above. Each article view is logged once when a reader opens it,
then updated every ~10s while the article stays open and the tab is in
the foreground, so read-time reflects real attention rather than an idle
background tab.
