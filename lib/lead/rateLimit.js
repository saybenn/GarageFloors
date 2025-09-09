// Simple token bucket: 5 requests per minute per IP (best-effort; serverless may reset).
const WINDOW_MS = 60_000;
const LIMIT = 5;

const buckets = new Map(); // ip -> { count, reset }

export function rateLimit(ip) {
  const now = Date.now();
  const b = buckets.get(ip) || { count: 0, reset: now + WINDOW_MS };
  if (now > b.reset) {
    b.count = 0;
    b.reset = now + WINDOW_MS;
  }
  b.count += 1;
  buckets.set(ip, b);
  return b.count <= LIMIT;
}
