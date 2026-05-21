/**
 * Vercel serverless — portfolio analytics proxy.
 * Reads from Supabase (server-side) for environments where client-side
 * Supabase is not available. Falls back to CountAPI for backwards compat.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

async function supabaseQuery(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...options.headers,
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) return null;
  return res.json();
}

async function supabaseRpc(fnName) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: '{}',
  });

  if (!res.ok) return null;
  return res.json();
}

/* ── CountAPI fallback ──────────────────────────────────────── */

const COUNT_NS = 'shre-raam-portfolio';

async function countApiGet(key) {
  try {
    const res = await fetch(`https://api.countapi.xyz/get/${COUNT_NS}/${key}`);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.value ?? 0;
  } catch {
    return 0;
  }
}

async function countApiHit(key) {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${COUNT_NS}/${key}`);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.value ?? 0;
  } catch {
    return 0;
  }
}

/* ── Handler ────────────────────────────────────────────────── */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      // Try Supabase first
      const counter = await supabaseQuery('visit_counter?id=eq.1&select=count');
      if (counter && counter[0]) {
        const activeCount = await supabaseRpc('get_active_session_count');
        return res.status(200).json({
          visits: Number(counter[0].count) || 0,
          activeUsers: Number(activeCount) || 0,
        });
      }

      // Fallback to CountAPI
      const [visits, interactions] = await Promise.all([
        countApiGet('visits'),
        countApiGet('interactions'),
      ]);
      return res.status(200).json({ visits, interactions, activeUsers: 0 });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const action = body.action || 'visit';

      // Try Supabase RPC
      if (action === 'visit') {
        const newCount = await supabaseRpc('increment_visit_counter');
        if (newCount != null) {
          return res.status(200).json({ visits: newCount });
        }
      }

      // Fallback to CountAPI
      if (action === 'interaction') {
        const interactions = await countApiHit('interactions');
        return res.status(200).json({ interactions });
      }

      const visits = await countApiHit('visits');
      return res.status(200).json({ visits });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('analytics api', err);
    return res.status(500).json({ error: 'Analytics unavailable' });
  }
}
