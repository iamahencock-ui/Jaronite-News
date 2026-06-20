import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

const assetManifest = JSON.parse(manifestJSON);

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