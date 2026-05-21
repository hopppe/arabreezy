import { config } from '../lib/config.js';

// Verify a Supabase access token by calling /auth/v1/user. This avoids
// pulling in @supabase/supabase-js (which brings in a websocket dep for
// realtime that we don't need here).
async function verifyToken(token) {
  const res = await fetch(`${config.supabase.url}/auth/v1/user`, {
    headers: {
      apikey: config.supabase.anonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  const user = await res.json().catch(() => null);
  return user && user.id ? user : null;
}

// Express middleware: attaches req.user on success; 401s otherwise.
export async function requireUser(req, res, next) {
  if (config.allowAnon) {
    req.user = { id: 'anon-dev', email: null };
    return next();
  }
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'missing_token' });
  }
  try {
    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: 'invalid_token' });
    }
    req.user = user;
    return next();
  } catch (_err) {
    return res.status(401).json({ error: 'auth_failed' });
  }
}
