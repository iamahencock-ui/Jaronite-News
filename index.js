import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

const assetManifest = JSON.parse(manifestJSON);

// ---------- password hashing (Web Crypto PBKDF2, no extra deps) ----------

function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes.buffer;
}

async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const salt = saltHex ? hexToBuf(saltHex) : crypto.getRandomValues(new Uint8Array(16)).buffer;
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return { hash: bufToHex(bits), salt: bufToHex(salt) };
}

async function verifyPassword(password, storedHash, storedSaltHex) {
  const { hash } = await hashPassword(password, storedSaltHex);
  if (hash.length !== storedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ storedHash.charCodeAt(i);
  return diff === 0;
}

function newSessionToken() {
  return bufToHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
}

// ---------- session-based auth ----------

async function getSessionUser(env, request) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  const session = await env.DB.prepare(
    "SELECT username, expires_at FROM sessions WHERE token = ?"
  ).bind(token).first();
  if (!session) return null;
  if (new Date(session.expires_at) < new Date()) return null;

  const user = await env.DB.prepare(
    "SELECT id, username, role, status FROM users WHERE username = ?"
  ).bind(session.username).first();
  if (!user || user.status !== "active") return null;

  // Sliding expiry: every valid authenticated request pushes the session's
  // expiry 20 minutes further out, so active users stay logged in and only
  // truly idle sessions (20 min with no requests) expire.
  const newExpiresAt = new Date(Date.now() + 1000 * 60 * 20).toISOString();
  await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE token = ?").bind(newExpiresAt, token).run();

  return user;
}

async function requireAdmin(env, request) {
  const user = await getSessionUser(env, request);
  if (!user || user.role !== "admin") return null;
  return user;
}

// Anything an editor can do, an admin can also do.
async function requireEditorOrAdmin(env, request) {
  const user = await getSessionUser(env, request);
  if (!user || (user.role !== "editor" && user.role !== "admin")) return null;
  return user;
}

async function log(env, username, action, details = "") {
  await env.DB.prepare("INSERT INTO logs (username, action, details) VALUES (?, ?, ?)").bind(username, action, details).run();
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API: Login
    if (url.pathname === "/api/login" && request.method === "POST") {
      const { username, password } = await request.json();
      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE username = ?"
      ).bind(username).first();

      const ok = user && user.status === "active" && (await verifyPassword(password, user.password, user.password_salt));

      if (ok) {
        const token = newSessionToken();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 20).toISOString(); // 20min sliding session
        await env.DB.prepare(
          "INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)"
        ).bind(token, user.username, expiresAt).run();
        await env.DB.prepare("UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE username = ?").bind(user.username).run();

        await log(env, username, "LOGIN", "Logged into employee portal");
        return Response.json({ success: true, token, user: { username: user.username, role: user.role } });
      }
      await log(env, username, "FAILED_LOGIN", "Failed login attempt");
      return Response.json({ success: false });
    }

    // API: Logout
    if (url.pathname === "/api/logout" && request.method === "POST") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (token) await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
      return Response.json({ success: true });
    }

    // API: Submit article (writers, editors, admins all submit through here)
    // New articles always start as pending_review — nobody publishes directly
    // through this route, regardless of role. Editors/admins who want to skip
    // review use /api/articles/instapublish instead.
    if (url.pathname === "/api/articles" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const { title, category, content } = await request.json();
      await env.DB.prepare(
        "INSERT INTO articles (title, category, content, author, status) VALUES (?, ?, ?, ?, 'pending_review')"
      ).bind(title, category, content, user.username).run();
      await log(env, user.username, "POST_ARTICLE", `Submitted article "${title}" in category "${category}" for review`);
      return Response.json({ success: true });
    }

    // EDITOR/ADMIN: publish an article immediately, skipping the review pipeline
    // entirely (no pending_review/claimed row is ever created). Logged distinctly
    // so it's clear in the audit trail that it bypassed review.
    if (url.pathname === "/api/articles/instapublish" && request.method === "POST") {
      const user = await requireEditorOrAdmin(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { title, category, content } = await request.json();
      if (!title || !content || !category) {
        return Response.json({ error: "Title, category, and content are all required." }, { status: 400 });
      }

      await env.DB.prepare(
        "INSERT INTO articles (title, category, content, author, status) VALUES (?, ?, ?, ?, 'published')"
      ).bind(title, category, content, user.username).run();
      await log(env, user.username, "INSTAPUBLISH_ARTICLE", `Published article "${title}" in category "${category}" directly, bypassing review`);
      return Response.json({ success: true });
    }

    // API: Get published articles by category (public-facing pages)
    if (url.pathname === "/api/articles" && request.method === "GET") {
      const category = url.searchParams.get("category");
      const results = await env.DB.prepare(
        "SELECT * FROM articles WHERE category = ? AND status = 'published' ORDER BY created_at DESC"
      ).bind(category).all();
      return Response.json(results.results);
    }

    // ---------------- SHARED: article detail (powers the click-to-expand overlay) ----------------

    // Any authenticated user: fetch one article's full detail. Writers may only
    // view their own articles this way; editors/admins may view any article.
    // This route itself grants no new permissions — every action button the
    // frontend shows still re-validates against its own route exactly as before.
    if (url.pathname === "/api/article-detail" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });

      const isPrivileged = user.role === "editor" || user.role === "admin";
      if (!isPrivileged && article.author !== user.username) {
        return Response.json({ error: "Unauthorized" }, { status: 403 });
      }

      return Response.json(article);
    }

    // ---------------- WRITER: "My Articles" ----------------

    // WRITER: list the logged-in user's own submissions + status.
    // Read-only by design — editing only happens via /api/my-articles/resubmit
    // on articles that are in the 'returned' state.
    if (url.pathname === "/api/my-articles" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const results = await env.DB.prepare(
        "SELECT id, title, category, content, status, claimed_by, review_notes, created_at, updated_at FROM articles WHERE author = ? ORDER BY updated_at DESC"
      ).bind(user.username).all();
      return Response.json(results.results);
    }

    // WRITER: resubmit a 'returned' article with revised content.
    // Goes straight back to 'claimed' under the SAME editor who returned it —
    // it does not re-enter the open pending_review pool.
    if (url.pathname === "/api/my-articles/resubmit" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const { id, title, content } = await request.json();
      const article = await env.DB.prepare(
        "SELECT * FROM articles WHERE id = ? AND author = ?"
      ).bind(id, user.username).first();

      if (!article) return Response.json({ error: "Not found" }, { status: 404 });
      if (article.status !== "returned") {
        return Response.json({ error: "This article isn't awaiting revision." }, { status: 400 });
      }

      await env.DB.prepare(
        "UPDATE articles SET title = ?, content = ?, status = 'claimed', review_notes = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(title, content, id).run();
      await log(env, user.username, "RESUBMIT_ARTICLE", `Resubmitted article "${title}" (ID ${id}) to ${article.claimed_by} after revision`);
      return Response.json({ success: true });
    }

    // ---------------- EDITOR (and admin): review queue ----------------

    // EDITOR/ADMIN: pending_review queue (open pool, nothing claimed yet)
    if (url.pathname === "/api/editor/pending" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const results = await env.DB.prepare(
        "SELECT id, title, category, author, status, created_at FROM articles WHERE status = 'pending_review' ORDER BY created_at ASC"
      ).all();
      return Response.json(results.results);
    }

    // EDITOR/ADMIN: claim a pending article. Once claimed, it disappears from
    // other editors' pending queue, but admins still see it (with claimed_by shown).
    if (url.pathname === "/api/editor/claim" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });
      if (article.status !== "pending_review") {
        return Response.json({ error: "This article has already been claimed or is no longer pending." }, { status: 409 });
      }

      await env.DB.prepare(
        "UPDATE articles SET status = 'claimed', claimed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(reviewer.username, id).run();
      await log(env, reviewer.username, "CLAIM_ARTICLE", `Claimed article "${article.title}" (ID ${id}) for review`);
      return Response.json({ success: true });
    }

    // EDITOR/ADMIN: "My Review Box" — articles claimed by the logged-in reviewer
    // (includes ones returned-and-not-yet-resubmitted, since they stay claimed).
    if (url.pathname === "/api/editor/my-claims" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const results = await env.DB.prepare(
        "SELECT id, title, category, author, content, status, review_notes, created_at, updated_at FROM articles WHERE claimed_by = ? AND status IN ('claimed', 'returned') ORDER BY updated_at DESC"
      ).bind(reviewer.username).all();
      return Response.json(results.results);
    }

    // ADMIN-ONLY: full view of every claimed/in-progress article across all editors,
    // each tagged with who has it ("under review by ___"). Editors only see their own
    // claims via /api/editor/my-claims; this route is for admin oversight.
    // Includes full content so the admin can act (approve/return/deny) without
    // needing to claim it first.
    if (url.pathname === "/api/admin/all-claimed" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const results = await env.DB.prepare(
        "SELECT id, title, category, author, content, status, claimed_by, review_notes, created_at, updated_at FROM articles WHERE status IN ('claimed', 'returned') ORDER BY updated_at DESC"
      ).all();
      return Response.json(results.results);
    }

    // ADMIN-ONLY: take over ("steal") any in-progress article, regardless of who
    // currently has it claimed — or claim straight out of the open pending pool.
    // Reassigns claimed_by to the admin. Logged as a distinct action so it's
    // visible in the audit trail that it was taken from another reviewer.
    if (url.pathname === "/api/admin/steal-claim" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });
      if (!["pending_review", "claimed", "returned"].includes(article.status)) {
        return Response.json({ error: "This article isn't in a reviewable state." }, { status: 400 });
      }

      const previousOwner = article.claimed_by; // null if it was still in the open pool
      const newStatus = article.status === "pending_review" ? "claimed" : article.status;

      await env.DB.prepare(
        "UPDATE articles SET status = ?, claimed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(newStatus, admin.username, id).run();

      await log(
        env,
        admin.username,
        "ADMIN_REASSIGN_CLAIM",
        previousOwner
          ? `Took over article "${article.title}" (ID ${id}) from ${previousOwner}`
          : `Claimed article "${article.title}" (ID ${id}) directly from the pending pool`
      );
      return Response.json({ success: true });
    }

    // EDITOR/ADMIN: approve a claimed (or, for admins, returned) article -> published
    if (url.pathname === "/api/editor/approve" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });

      // Editors may only act on their own 'claimed' articles. Admins may also act
      // directly on a 'returned' article (bypassing the writer's revision step)
      // and on anyone's claim, not just their own.
      const adminCanAct = reviewer.role === "admin" && (article.status === "claimed" || article.status === "returned");
      const editorCanAct = reviewer.role !== "admin" && article.status === "claimed" && article.claimed_by === reviewer.username;
      if (!adminCanAct && !editorCanAct) {
        if (article.status !== "claimed" && article.status !== "returned") {
          return Response.json({ error: "Only claimed or returned articles can be approved." }, { status: 400 });
        }
        return Response.json({ error: "This article is claimed by another editor." }, { status: 403 });
      }

      await env.DB.prepare(
        "UPDATE articles SET status = 'published', reviewed_by = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(reviewer.username, id).run();
      await log(env, reviewer.username, "APPROVE_ARTICLE", `Approved and published article "${article.title}" (ID ${id}) by ${article.author}`);
      return Response.json({ success: true });
    }

    // EDITOR/ADMIN: return a claimed article to the writer with instructions.
    // Stays claimed by the same reviewer.
    if (url.pathname === "/api/editor/return" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id, notes } = await request.json();
      if (!notes || !notes.trim()) {
        return Response.json({ error: "Instructions are required when returning an article." }, { status: 400 });
      }

      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });
      if (article.status !== "claimed") {
        return Response.json({ error: "Only claimed articles can be returned." }, { status: 400 });
      }
      if (reviewer.role !== "admin" && article.claimed_by !== reviewer.username) {
        return Response.json({ error: "This article is claimed by another editor." }, { status: 403 });
      }

      // Admins keep the existing claimed_by as-is unless they've already stolen the
      // claim via /api/admin/steal-claim; returning doesn't itself reassign ownership.
      await env.DB.prepare(
        "UPDATE articles SET status = 'returned', review_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(notes, id).run();
      await log(env, reviewer.username, "RETURN_ARTICLE", `Returned article "${article.title}" (ID ${id}) to ${article.author} with revision notes`);
      return Response.json({ success: true });
    }

    // EDITOR/ADMIN: deny a claimed (or, for admins, returned) article. Permanent —
    // kept in DB, writer can see why.
    if (url.pathname === "/api/editor/deny" && request.method === "POST") {
      const reviewer = await requireEditorOrAdmin(env, request);
      if (!reviewer) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id, notes } = await request.json();
      const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      if (!article) return Response.json({ error: "Not found" }, { status: 404 });

      const adminCanAct = reviewer.role === "admin" && (article.status === "claimed" || article.status === "returned");
      const editorCanAct = reviewer.role !== "admin" && article.status === "claimed" && article.claimed_by === reviewer.username;
      if (!adminCanAct && !editorCanAct) {
        if (article.status !== "claimed" && article.status !== "returned") {
          return Response.json({ error: "Only claimed or returned articles can be denied." }, { status: 400 });
        }
        return Response.json({ error: "This article is claimed by another editor." }, { status: 403 });
      }

      await env.DB.prepare(
        "UPDATE articles SET status = 'denied', review_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(notes || null, id).run();
      await log(env, reviewer.username, "DENY_ARTICLE", `Denied article "${article.title}" (ID ${id}) by ${article.author}`);
      return Response.json({ success: true });
    }

    // ---------------- ADMIN: published-article moderation (unchanged) ----------------

    // ADMIN: Get all articles (any status)
    if (url.pathname === "/api/admin/articles" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { filter } = await request.json();
      let query = "SELECT * FROM articles ORDER BY created_at DESC";
      if (filter === "censored") query = "SELECT * FROM articles WHERE status = 'censored' ORDER BY created_at DESC";
      if (filter === "published") query = "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC";

      const results = await env.DB.prepare(query).all();
      return Response.json(results.results);
    }

    // ADMIN: Edit article
    if (url.pathname === "/api/admin/edit" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id, title, content } = await request.json();
      await env.DB.prepare("UPDATE articles SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(title, content, id).run();
      await log(env, admin.username, "EDIT_ARTICLE", `Edited article ID ${id} — new title: "${title}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Censor/uncensor a PUBLISHED article (post-publish takedown — separate from the review pipeline)
    if (url.pathname === "/api/admin/censor" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT status FROM articles WHERE id = ?").bind(id).first();
      const newStatus = article.status === "censored" ? "published" : "censored";
      await env.DB.prepare("UPDATE articles SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(newStatus, id).run();
      await log(env, admin.username, newStatus === "censored" ? "CENSOR_ARTICLE" : "UNCENSOR_ARTICLE", `Article ID ${id} set to ${newStatus}`);
      return Response.json({ success: true });
    }

    // ADMIN: Delete article
    if (url.pathname === "/api/admin/delete" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT title FROM articles WHERE id = ?").bind(id).first();
      await env.DB.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
      await log(env, admin.username, "DELETE_ARTICLE", `Deleted article ID ${id} — "${article?.title}"`);
      return Response.json({ success: true });
    }

    // ---------------- ADMIN: user management (unchanged) ----------------

    // ADMIN: Get all users
    if (url.pathname === "/api/admin/users" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const results = await env.DB.prepare(
        "SELECT id, username, role, status, created_at, last_login_at FROM users ORDER BY role ASC"
      ).all();
      return Response.json(results.results);
    }

    // ADMIN: Get single user's full (non-credential) profile
    if (url.pathname === "/api/admin/user-detail" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId } = await request.json();
      const target = await env.DB.prepare(
        "SELECT id, username, role, status, created_at, last_login_at FROM users WHERE id = ?"
      ).bind(targetId).first();
      if (!target) return Response.json({ error: "Not found" }, { status: 404 });

      const articleCount = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM articles WHERE author = ?"
      ).bind(target.username).first();

      return Response.json({ ...target, article_count: articleCount.count });
    }

    // ADMIN: Get a single user's complete action history
    if (url.pathname === "/api/admin/user-history" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      if (!target) return Response.json({ error: "Not found" }, { status: 404 });

      const results = await env.DB.prepare(
        "SELECT id, action, details, created_at FROM logs WHERE username = ? ORDER BY created_at DESC LIMIT 500"
      ).bind(target.username).all();
      return Response.json(results.results);
    }

    // ADMIN: Create user
    if (url.pathname === "/api/admin/create-user" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { newUsername, newPassword, role } = await request.json();
      const existing = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(newUsername).first();
      if (existing) return Response.json({ error: "Username already exists" });

      const { hash, salt } = await hashPassword(newPassword);
      await env.DB.prepare(
        "INSERT INTO users (username, password, password_salt, role, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
      ).bind(newUsername, hash, salt, role).run();
      await log(env, admin.username, "CREATE_USER", `Created user "${newUsername}" with role "${role}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Change user role (writer | editor | admin)
    if (url.pathname === "/api/admin/change-role" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId, role } = await request.json();
      if (!["writer", "editor", "admin"].includes(role)) {
        return Response.json({ error: "Invalid role" }, { status: 400 });
      }

      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(role, targetId).run();
      await log(env, admin.username, "CHANGE_ROLE", `Changed role of "${target?.username}" to "${role}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Suspend / reactivate user
    if (url.pathname === "/api/admin/set-status" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId, status } = await request.json();
      if (!["active", "suspended"].includes(status)) return Response.json({ error: "Invalid status" }, { status: 400 });

      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET status = ? WHERE id = ?").bind(status, targetId).run();
      if (status === "suspended" && target) {
        await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      }
      await log(env, admin.username, "SET_USER_STATUS", `Set status of "${target?.username}" to "${status}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Reset a user's password (admin sets a new one; old one is never shown)
    if (url.pathname === "/api/admin/reset-password" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId, newPassword } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      if (!target) return Response.json({ error: "Not found" }, { status: 404 });

      const { hash, salt } = await hashPassword(newPassword);
      await env.DB.prepare("UPDATE users SET password = ?, password_salt = ? WHERE id = ?").bind(hash, salt, targetId).run();
      await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      await log(env, admin.username, "RESET_PASSWORD", `Reset password for "${target.username}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Delete user
    if (url.pathname === "/api/admin/delete-user" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(targetId).run();
      if (target) await env.DB.prepare("DELETE FROM sessions WHERE username = ?").bind(target.username).run();
      await log(env, admin.username, "DELETE_USER", `Deleted user "${target?.username}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Get logs (global)
    if (url.pathname === "/api/admin/logs" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const results = await env.DB.prepare("SELECT * FROM logs ORDER BY created_at DESC LIMIT 500").all();
      return Response.json(results.results);
    }

    // Serve static files
    try {
      return await getAssetFromKV(
        { request, waitUntil(promise) { return ctx.waitUntil(promise); } },
        { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
      );
    } catch (e) {
      return new Response("404 Not Found", { status: 404 });
    }
  },
};