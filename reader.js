/* ============================================================
   reader.js — shared client logic for Discord login, favorites,
   and view analytics. Included on the homepage and all four
   category pages. Nothing here touches staff/portal auth at all;
   it only ever talks to the /api/auth/discord/*, /api/favorites/*,
   /api/comments*, and /api/analytics/* routes.
   ============================================================ */

const READER_TOKEN_KEY = "jaronite_discord_token";
const VISITOR_ID_KEY    = "jaronite_visitor_id";

/**
 * Get (or lazily create) a stable per-browser visitor ID used purely for
 * de-duplicating analytics view counts ("how many distinct visitors", not
 * "how many page loads"). Not tied to any account — works for logged-out
 * readers too. Stored in localStorage, not a cookie, so it's never sent to
 * the server except explicitly in the analytics payload itself.
 * @returns {string}
 */
function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getReaderToken() {
  return localStorage.getItem(READER_TOKEN_KEY);
}

function setReaderToken(token) {
  localStorage.setItem(READER_TOKEN_KEY, token);
}

function clearReaderToken() {
  localStorage.removeItem(READER_TOKEN_KEY);
}

/**
 * Picks up a token handed back from /api/auth/discord/callback in the URL
 * fragment (#discord_token=...&state=...), verifies the CSRF state value
 * against what we generated before redirecting to Discord, stores the
 * token, and cleans the fragment off the URL so it isn't left visible or
 * re-processed on refresh.
 */
function consumeDiscordRedirectFragment() {
  if (!location.hash.includes("discord_token=")) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const token = params.get("discord_token");
  const returnedState = params.get("state");
  const expectedState = sessionStorage.getItem("discord_oauth_state");
  sessionStorage.removeItem("discord_oauth_state");

  if (token && returnedState && expectedState && returnedState === expectedState) {
    setReaderToken(token);
  }
  // Strip the fragment either way so it's never left sitting in the URL.
  history.replaceState(null, "", location.pathname + location.search);
}

/**
 * Begin the Discord login flow: generate a random CSRF state value, stash
 * it in sessionStorage so the redirect callback can verify it came back
 * unmodified, then navigate to the worker's redirect endpoint.
 */
function startDiscordLogin() {
  const state = crypto.randomUUID();
  sessionStorage.setItem("discord_oauth_state", state);
  window.location.href = `/api/auth/discord/login?state=${encodeURIComponent(state)}`;
}

async function discordLogout() {
  const token = getReaderToken();
  if (token) {
    try {
      await fetch("/api/auth/discord/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    } catch (e) { /* best-effort */ }
  }
  clearReaderToken();
  window.location.reload();
}

/**
 * Render the reader-auth widget (login button, or avatar+name with a
 * dropdown menu showing favorited articles) into the given container.
 * Re-fetches /api/auth/discord/me to confirm the stored token is still
 * valid, and silently falls back to the logged-out state if not.
 * @param {HTMLElement} container
 */
async function renderReaderAuthWidget(container) {
  consumeDiscordRedirectFragment();
  const token = getReaderToken();

  if (!token) {
    container.innerHTML = `
      <button class="reader-login-btn" onclick="startDiscordLogin()">
        <svg viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
        <span>Login with Discord</span>
      </button>`;
    return;
  }

  let me;
  try {
    const res = await fetch("/api/auth/discord/me", { headers: { Authorization: `Bearer ${token}` } });
    me = await res.json();
  } catch (e) {
    me = { loggedIn: false };
  }

  if (!me.loggedIn) {
    clearReaderToken();
    return renderReaderAuthWidget(container);
  }

  const avatarSrc = me.avatarUrl || "https://cdn.discordapp.com/embed/avatars/0.png";

  container.innerHTML = `
    <div class="reader-account" id="reader-account-toggle">
      <img src="${avatarSrc}" alt="">
      <span class="reader-name">${escapeHtmlGlobal(me.username)}</span>
      <svg class="reader-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="reader-menu" id="reader-menu">
      <div class="reader-menu-profile">
        <img class="reader-menu-avatar" src="${avatarSrc}" alt="">
        <div class="reader-menu-profile-text">
          <div class="reader-menu-display-name">${escapeHtmlGlobal(me.username)}</div>
          <div class="reader-menu-sub">Discord Reader</div>
        </div>
      </div>
      <div class="reader-menu-divider"></div>
      <a class="reader-menu-item" href="/favorites">
        <svg viewBox="0 0 20 20" fill="none"><path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        My Favorites
      </a>
      <div class="reader-menu-divider"></div>
      <div class="reader-menu-section-label">Settings</div>
      <label class="reader-menu-toggle-item" title="Get notified about new articles">
        <span>
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 0 1 6 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 0 1 6-6z" stroke="currentColor" stroke-width="1.5"/><path d="M8 15a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5"/></svg>
          Notifications
        </span>
        <input type="checkbox" id="reader-setting-notifs" onchange="readerSettingChanged('notifs', this.checked)">
        <span class="reader-toggle-track"><span class="reader-toggle-thumb"></span></span>
      </label>
      <label class="reader-menu-toggle-item" title="Use dark theme when reading articles">
        <span>
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 0 8 8A8 8 0 0 0 10 2zm0 14A6 6 0 0 1 10 4v12z" stroke="currentColor" stroke-width="1.5"/></svg>
          Dark reading mode
        </span>
        <input type="checkbox" id="reader-setting-dark" onchange="readerSettingChanged('dark', this.checked)">
        <span class="reader-toggle-track"><span class="reader-toggle-thumb"></span></span>
      </label>
      <div class="reader-menu-divider"></div>
      <button class="reader-menu-logout-btn" onclick="discordLogout()">
        <svg viewBox="0 0 20 20" fill="none"><path d="M13 7l3 3-3 3M16 10H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Log out
      </button>
    </div>`;

  const toggle = document.getElementById("reader-account-toggle");
  const menu = document.getElementById("reader-menu");
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });
  document.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.classList.remove("open");
  });
  menu.addEventListener("click", (e) => e.stopPropagation());

  // Apply saved settings
  const savedSettings = getReaderSettings();
  const notifCb = document.getElementById("reader-setting-notifs");
  const darkCb  = document.getElementById("reader-setting-dark");
  if (notifCb) notifCb.checked = !!savedSettings.notifs;
  if (darkCb)  darkCb.checked  = !!savedSettings.dark;
  if (savedSettings.dark) document.body.classList.add("reader-dark-mode");

  // Chevron flip on open
  toggle.addEventListener("click", () => toggle.classList.toggle("open"));
}

function getReaderSettings() {
  try { return JSON.parse(localStorage.getItem("jni_reader_settings") || "{}"); } catch { return {}; }
}

function readerSettingChanged(key, value) {
  const s = getReaderSettings();
  s[key] = value;
  try { localStorage.setItem("jni_reader_settings", JSON.stringify(s)); } catch {}
  if (key === "dark") {
    document.body.classList.toggle("reader-dark-mode", value);
  }
}

async function loadFavoritesIntoMenu() {
  const token = getReaderToken();
  const list = document.getElementById("reader-favorites-list");
  if (!token || !list) return;

  try {
    const res = await fetch("/api/favorites", { headers: { Authorization: `Bearer ${token}` } });
    const favorites = await res.json();

    if (!Array.isArray(favorites) || favorites.length === 0) {
      list.innerHTML = `<div class="reader-menu-empty">No favorites yet — tap the ♡ on any article to save it here.</div>`;
      return;
    }

    list.innerHTML = favorites.map(f => `
      <a class="reader-menu-item" href="/${escapeHtmlGlobal(f.category)}">
        ${escapeHtmlGlobal(f.title)}
        <span class="fav-cat">${escapeHtmlGlobal(f.category)}</span>
      </a>
    `).join("");
  } catch (e) {
    list.innerHTML = `<div class="reader-menu-empty">Couldn't load favorites.</div>`;
  }
}

/**
 * Build a heart/favorite toggle button. `favorited` sets the initial
 * visual state; `onToggle(newState)` fires after a successful server
 * round-trip so callers can update any other UI (e.g. a card's class).
 * @param {number} articleId
 * @param {boolean} favorited
 * @param {string} extraClass - additional class(es) for positioning (e.g. 'card-fav-btn')
 * @returns {string} HTML for the button
 */
function favButtonHtml(articleId, favorited, extraClass = "") {
  return `<button class="fav-btn ${extraClass} ${favorited ? "favorited" : ""}"
            data-article-id="${articleId}"
            onclick="handleFavClick(event, ${articleId})"
            aria-label="${favorited ? "Remove from favorites" : "Add to favorites"}" title="Favorite">
            <svg viewBox="0 0 24 24" fill="${favorited ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2 4.5 5.7 4.5c2.1 0 3.6 1.2 4.3 2.4.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.2 3.9 3.7 7.4C19.5 16.4 12 21 12 21z"/>
            </svg>
          </button>`;
}

async function handleFavClick(event, articleId) {
  event.stopPropagation();
  event.preventDefault();
  const token = getReaderToken();
  if (!token) { startDiscordLogin(); return; }

  const btn = event.currentTarget;
  btn.disabled = true;
  try {
    const res = await fetch("/api/favorites/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ article_id: articleId }),
    });
    const data = await res.json();
    document.querySelectorAll(`[data-article-id="${articleId}"].fav-btn`).forEach(b => {
      b.classList.toggle("favorited", data.favorited);
      const path = b.querySelector("path");
      if (path) path.setAttribute("fill", data.favorited ? "currentColor" : "none");
    });
  } catch (e) {
    // best-effort; leave button state unchanged on failure
  } finally {
    btn.disabled = false;
  }
}

/**
 * Mark which cards in a freshly-rendered grid are already favorited by the
 * logged-in reader, in a single batched request rather than one per card.
 * @param {number[]} articleIds
 */
async function paintFavoriteStates(articleIds) {
  const token = getReaderToken();
  if (!token || articleIds.length === 0) return;
  try {
    const res = await fetch("/api/favorites/check", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ article_ids: articleIds }),
    });
    const data = await res.json();
    (data.favorited || []).forEach(id => {
      document.querySelectorAll(`[data-article-id="${id}"].fav-btn`).forEach(b => {
        b.classList.add("favorited");
        const path = b.querySelector("path");
        if (path) path.setAttribute("fill", "currentColor");
      });
    });
  } catch (e) { /* non-critical */ }
}

function escapeHtmlGlobal(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------- Comments ----------------

async function loadComments(articleId, container) {
  container.innerHTML = `<div class="comments-empty">Loading comments…</div>`;
  try {
    const res = await fetch(`/api/comments?article_id=${articleId}`);
    const comments = await res.json();

    if (!Array.isArray(comments) || comments.length === 0) {
      container.innerHTML = `<div class="comments-empty">No comments yet — be the first to weigh in.</div>`;
      return;
    }

    const token = getReaderToken();
    let myUsername = null;
    if (token) {
      try {
        const meRes = await fetch("/api/auth/discord/me", { headers: { Authorization: `Bearer ${token}` } });
        const me = await meRes.json();
        if (me.loggedIn) myUsername = me.username;
      } catch (e) { /* ignore */ }
    }

    container.innerHTML = comments.map(c => `
      <div class="comment-item" data-comment-id="${c.id}">
        <img src="${c.avatarUrl || "https://cdn.discordapp.com/embed/avatars/0.png"}" alt="">
        <div class="comment-body">
          <div class="comment-meta">
            <span class="comment-author">${escapeHtmlGlobal(c.username)}</span>
            <span class="comment-date">${new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div class="comment-text">${escapeHtmlGlobal(c.content)}</div>
          ${myUsername === c.username ? `<button class="comment-delete" onclick="deleteComment(${c.id}, ${articleId})">Delete</button>` : ""}
        </div>
      </div>
    `).join("");
  } catch (e) {
    container.innerHTML = `<div class="comments-empty">Couldn't load comments.</div>`;
  }
}

async function postComment(articleId, textarea, statusEl, listEl) {
  const token = getReaderToken();
  if (!token) { startDiscordLogin(); return; }

  const content = textarea.value.trim();
  if (!content) return;

  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ article_id: articleId, content }),
    });
    const data = await res.json();
    if (data.error) {
      statusEl.textContent = data.error;
      return;
    }
    textarea.value = "";
    statusEl.textContent = "";
    await loadComments(articleId, listEl);
  } catch (e) {
    statusEl.textContent = "Couldn't post comment — try again.";
  }
}

async function deleteComment(commentId, articleId) {
  const token = getReaderToken();
  if (!token) return;
  try {
    await fetch("/api/comments/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ comment_id: commentId }),
    });
    const listEl = document.getElementById("comments-list");
    if (listEl) await loadComments(articleId, listEl);
  } catch (e) { /* best-effort */ }
}

/**
 * Build the comments section HTML for the article modal (login prompt or
 * textarea depending on auth state, plus the comment list container).
 * @param {number} articleId
 * @returns {string}
 */
function commentsSectionHtml(articleId) {
  const token = getReaderToken();
  const formHtml = token
    ? `<div class="comment-form">
         <textarea id="comment-input" placeholder="Share your thoughts..." maxlength="2000"></textarea>
         <button onclick="postComment(${articleId}, document.getElementById('comment-input'), document.getElementById('comment-status'), document.getElementById('comments-list'))">Post</button>
       </div>
       <div id="comment-status" style="color:#a00000;font-size:0.8rem;margin-bottom:10px;"></div>`
    : `<div class="comment-login-prompt">
         <span>Log in with Discord to join the conversation.</span>
         <button class="reader-login-btn" onclick="startDiscordLogin()" style="width:auto;">Login with Discord</button>
       </div>`;

  return `
    <div class="comments-section">
      <div class="comments-heading">Comments</div>
      ${formHtml}
      <div id="comments-list"></div>
    </div>`;
}

// ---------------- Analytics (view tracking) ----------------

let _analyticsViewId = null;
let _analyticsStartTime = null;
let _analyticsReadSeconds = 0;
let _analyticsMaxScroll = 0;
let _analyticsPingTimer = null;
let _analyticsVisible = true;

/**
 * Begin tracking a view for the given article: records the initial view
 * row, then pings read-time + scroll-depth updates every 10s while the
 * tab is visible. Call stopArticleViewTracking() when the modal closes.
 * @param {number} articleId
 * @param {HTMLElement} scrollContainer - element whose scroll position represents reading progress
 */
async function startArticleViewTracking(articleId, scrollContainer) {
  stopArticleViewTracking();
  _analyticsStartTime = Date.now();
  _analyticsReadSeconds = 0;
  _analyticsMaxScroll = 0;
  _analyticsVisible = document.visibilityState === "visible";

  try {
    const res = await fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        article_id: articleId,
        visitor_id: getVisitorId(),
        referrer: document.referrer || "",
      }),
    });
    const data = await res.json();
    _analyticsViewId = data.view_id || null;
  } catch (e) {
    _analyticsViewId = null;
  }

  const onVisibilityChange = () => { _analyticsVisible = document.visibilityState === "visible"; };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const onScroll = () => {
    if (!scrollContainer) return;
    const scrolled = scrollContainer.scrollTop + scrollContainer.clientHeight;
    const total = scrollContainer.scrollHeight;
    const pct = total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0;
    if (pct > _analyticsMaxScroll) _analyticsMaxScroll = pct;
  };
  if (scrollContainer) scrollContainer.addEventListener("scroll", onScroll);

  _analyticsPingTimer = setInterval(() => {
    if (_analyticsVisible) _analyticsReadSeconds += 10;
    if (_analyticsViewId) {
      fetch("/api/analytics/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          view_id: _analyticsViewId,
          read_seconds: _analyticsReadSeconds,
          max_scroll_pct: _analyticsMaxScroll,
        }),
      }).catch(() => {});
    }
  }, 10000);

  // Stash cleanup refs so stopArticleViewTracking can remove them.
  startArticleViewTracking._cleanup = () => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (scrollContainer) scrollContainer.removeEventListener("scroll", onScroll);
  };
}

function stopArticleViewTracking() {
  if (_analyticsPingTimer) clearInterval(_analyticsPingTimer);
  _analyticsPingTimer = null;
  if (startArticleViewTracking._cleanup) {
    startArticleViewTracking._cleanup();
    startArticleViewTracking._cleanup = null;
  }
  _analyticsViewId = null;
}