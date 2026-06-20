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
  // Constant-time-ish comparison
  if (hash.length !== storedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ storedHash.charCodeAt(i);
  return diff === 0;
}

function newSessionToken() {
  return bufToHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
}

// ---------- session-based auth (replaces trusting a raw "username" field) ----------

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
        const expiresAt = new Date(Date.now() + 1000 * 60 * 20).toISOString(); // 20min session
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

    // API: Post article
    if (url.pathname === "/api/articles" && request.method === "POST") {
      const user = await getSessionUser(env, request);
      if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

      const { title, category, content } = await request.json();
      await env.DB.prepare(
        "INSERT INTO articles (title, category, content, author) VALUES (?, ?, ?, ?)"
      ).bind(title, category, content, user.username).run();
      await log(env, user.username, "POST_ARTICLE", `Posted article "${title}" in category "${category}"`);
      return Response.json({ success: true });
    }

    // API: Get articles by category
    if (url.pathname === "/api/articles" && request.method === "GET") {
      const category = url.searchParams.get("category");
      const results = await env.DB.prepare(
        'SELECT * FROM articles WHERE category = ? AND status = "published" ORDER BY created_at DESC'
      ).bind(category).all();
      return Response.json(results.results);
    }

    // ADMIN: Get all articles
    if (url.pathname === "/api/admin/articles" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { filter } = await request.json();
      let query = "SELECT * FROM articles ORDER BY created_at DESC";
      if (filter === "censored") query = 'SELECT * FROM articles WHERE status = "censored" ORDER BY created_at DESC';

      const results = await env.DB.prepare(query).all();
      return Response.json(results.results);
    }

    // ADMIN: Edit article
    if (url.pathname === "/api/admin/edit" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id, title, content } = await request.json();
      await env.DB.prepare("UPDATE articles SET title = ?, content = ? WHERE id = ?").bind(title, content, id).run();
      await log(env, admin.username, "EDIT_ARTICLE", `Edited article ID ${id} — new title: "${title}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Censor/uncensor article
    if (url.pathname === "/api/admin/censor" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { id } = await request.json();
      const article = await env.DB.prepare("SELECT status FROM articles WHERE id = ?").bind(id).first();
      const newStatus = article.status === "censored" ? "published" : "censored";
      await env.DB.prepare("UPDATE articles SET status = ? WHERE id = ?").bind(newStatus, id).run();
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

    // ADMIN: Get all users
    if (url.pathname === "/api/admin/users" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      // Never selects password or password_salt.
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
      // Never selects password or password_salt.
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
        "INSERT INTO users (username, password, password_salt, role) VALUES (?, ?, ?, ?)"
      ).bind(newUsername, hash, salt, role).run();
      await log(env, admin.username, "CREATE_USER", `Created user "${newUsername}" with role "${role}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Change user role
    if (url.pathname === "/api/admin/change-role" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId, role } = await request.json();
      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(role, targetId).run();
      await log(env, admin.username, "CHANGE_ROLE", `Changed role of "${target?.username}" to "${role}"`);
      return Response.json({ success: true });
    }

    // ADMIN: Suspend / reactivate user (replaces silently deleting accounts when possible)
    if (url.pathname === "/api/admin/set-status" && request.method === "POST") {
      const admin = await requireAdmin(env, request);
      if (!admin) return Response.json({ error: "Unauthorized" }, { status: 403 });

      const { targetId, status } = await request.json();
      if (!["active", "suspended"].includes(status)) return Response.json({ error: "Invalid status" }, { status: 400 });

      const target = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(targetId).first();
      await env.DB.prepare("UPDATE users SET status = ? WHERE id = ?").bind(status, targetId).run();
      // Kill any active sessions if suspending
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