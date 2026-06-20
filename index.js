import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

const assetManifest = JSON.parse(manifestJSON);

async function isAdmin(env, username) {
  const user = await env.DB.prepare('SELECT role FROM users WHERE username = ?').bind(username).first();
  return user && user.role === 'admin';
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API: Login
    if (url.pathname === '/api/login' && request.method === 'POST') {
      const { username, password } = await request.json();
      const result = await env.DB.prepare(
        'SELECT * FROM users WHERE username = ? AND password = ?'
      ).bind(username, password).first();

      if (result) {
        return Response.json({ success: true, user: { username: result.username, role: result.role } });
      }
      return Response.json({ success: false });
    }

    // API: Post article
    if (url.pathname === '/api/articles' && request.method === 'POST') {
      const { title, category, content, author } = await request.json();
      await env.DB.prepare(
        'INSERT INTO articles (title, category, content, author) VALUES (?, ?, ?, ?)'
      ).bind(title, category, content, author).run();
      return Response.json({ success: true });
    }

    // API: Get articles by category
    if (url.pathname === '/api/articles' && request.method === 'GET') {
      const category = url.searchParams.get('category');
      const results = await env.DB.prepare(
        'SELECT * FROM articles WHERE category = ? AND status = "published" ORDER BY created_at DESC'
      ).bind(category).all();
      return Response.json(results.results);
    }

    // ADMIN: Get all articles
    if (url.pathname === '/api/admin/articles' && request.method === 'POST') {
      const { username, filter } = await request.json();
      if (!await isAdmin(env, username)) return Response.json({ error: 'Unauthorized' }, { status: 403 });

      let query = 'SELECT * FROM articles ORDER BY created_at DESC';
      if (filter === 'censored') query = 'SELECT * FROM articles WHERE status = "censored" ORDER BY created_at DESC';

      const results = await env.DB.prepare(query).all();
      return Response.json(results.results);
    }

    // ADMIN: Edit article
    if (url.pathname === '/api/admin/edit' && request.method === 'POST') {
      const { username, id, title, content } = await request.json();
      if (!await isAdmin(env, username)) return Response.json({ error: 'Unauthorized' }, { status: 403 });

      await env.DB.prepare('UPDATE articles SET title = ?, content = ? WHERE id = ?').bind(title, content, id).run();
      return Response.json({ success: true });
    }

    // ADMIN: Censor/uncensor article
    if (url.pathname === '/api/admin/censor' && request.method === 'POST') {
      const { username, id } = await request.json();
      if (!await isAdmin(env, username)) return Response.json({ error: 'Unauthorized' }, { status: 403 });

      const article = await env.DB.prepare('SELECT status FROM articles WHERE id = ?').bind(id).first();
      const newStatus = article.status === 'censored' ? 'published' : 'censored';
      await env.DB.prepare('UPDATE articles SET status = ? WHERE id = ?').bind(newStatus, id).run();
      return Response.json({ success: true });
    }

    // ADMIN: Delete article
    if (url.pathname === '/api/admin/delete' && request.method === 'POST') {
      const { username, id } = await request.json();
      if (!await isAdmin(env, username)) return Response.json({ error: 'Unauthorized' }, { status: 403 });

      await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
      return Response.json({ success: true });
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