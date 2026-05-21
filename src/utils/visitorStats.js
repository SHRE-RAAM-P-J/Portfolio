import { supabase } from './supabase';

const SESSION_KEY = 'portfolio-session-id';
const VISIT_KEY = 'portfolio-visit-recorded';
const HEARTBEAT_MS = 30_000; // 30 seconds

let heartbeatTimer = null;
let sessionId = null;

/* ── Session ID ─────────────────────────────────────────────── */

function getSessionId() {
  if (sessionId) return sessionId;

  try {
    let stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) {
      stored = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, stored);
    }
    sessionId = stored;
  } catch {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  return sessionId;
}

/* ── Visit Recording ────────────────────────────────────────── */

/**
 * Record one portfolio visit per browser session.
 * Inserts into page_visits + increments the visit_counter.
 */
export async function recordVisit() {
  if (!supabase) return;

  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, '1');
  } catch {
    /* private browsing */
  }

  const sid = getSessionId();

  try {
    await Promise.all([
      supabase.from('page_visits').insert({
        session_id: sid,
        path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      }),
      supabase.rpc('increment_visit_counter'),
    ]);
  } catch (err) {
    console.warn('[analytics] recordVisit failed:', err);
  }
}

/* ── Event Recording ────────────────────────────────────────── */

let lastEvent = 0;

/**
 * Record an analytics event.
 * @param {string} eventType - e.g. 'project_click', 'blog_open', 'resume_download'
 * @param {Record<string, any>} [metadata] - optional extra data
 */
export async function recordEvent(eventType, metadata = {}) {
  if (!supabase) return;

  // Throttle: max one event per 300ms
  const now = Date.now();
  if (now - lastEvent < 300) return;
  lastEvent = now;

  try {
    await supabase.from('analytics_events').insert({
      session_id: getSessionId(),
      event_type: eventType,
      metadata,
    });
  } catch (err) {
    console.warn('[analytics] recordEvent failed:', err);
  }
}

/* ── Active Session (Presence) ──────────────────────────────── */

/**
 * Register this session as active and start a heartbeat.
 */
export async function startSession() {
  if (!supabase) return;

  const sid = getSessionId();

  try {
    await supabase.from('active_sessions').upsert(
      {
        session_id: sid,
        last_seen: new Date().toISOString(),
        path: window.location.pathname,
      },
      { onConflict: 'session_id' }
    );
  } catch (err) {
    console.warn('[analytics] startSession failed:', err);
  }

  // Start heartbeat
  stopHeartbeat();
  heartbeatTimer = window.setInterval(() => sendHeartbeat(sid), HEARTBEAT_MS);

  // Clean up on page close
  window.addEventListener('beforeunload', handleUnload);
  document.addEventListener('visibilitychange', handleVisibility);
}

async function sendHeartbeat(sid) {
  if (!supabase) return;
  try {
    await supabase
      .from('active_sessions')
      .update({ last_seen: new Date().toISOString(), path: window.location.pathname })
      .eq('session_id', sid);
  } catch {
    /* silent */
  }
}

function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

/**
 * End the session — delete from active_sessions.
 */
export async function endSession() {
  if (!supabase) return;
  stopHeartbeat();
  window.removeEventListener('beforeunload', handleUnload);
  document.removeEventListener('visibilitychange', handleVisibility);

  const sid = getSessionId();
  try {
    // Use sendBeacon pattern for reliability on page close
    await supabase.from('active_sessions').delete().eq('session_id', sid);
  } catch {
    /* best effort */
  }
}

function handleUnload() {
  if (!supabase) return;
  const sid = getSessionId();
  // sendBeacon fallback for page close
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/active_sessions?session_id=eq.${sid}`;
    const headers = {
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    };
    // navigator.sendBeacon doesn't support DELETE, so use fetch with keepalive
    fetch(url, {
      method: 'DELETE',
      headers,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* best effort */
  }
  stopHeartbeat();
}

function handleVisibility() {
  if (document.visibilityState === 'hidden') {
    stopHeartbeat();
  } else {
    const sid = getSessionId();
    sendHeartbeat(sid);
    heartbeatTimer = window.setInterval(() => sendHeartbeat(sid), HEARTBEAT_MS);
  }
}

/* ── Fetch Stats (initial load) ─────────────────────────────── */

/**
 * Fetch current analytics snapshot.
 * @returns {Promise<{ visits: number; activeUsers: number } | null>}
 */
export async function fetchVisitorStats() {
  if (!supabase) return null;

  try {
    const [visitRes, sessionRes] = await Promise.all([
      supabase.from('visit_counter').select('count').eq('id', 1).single(),
      supabase.rpc('get_active_session_count'),
    ]);

    return {
      visits: Number(visitRes.data?.count) || 0,
      activeUsers: Number(sessionRes.data) || 0,
    };
  } catch {
    return null;
  }
}
