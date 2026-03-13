const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 5;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

type RateLimitOptions = {
  windowMs?: number;
  maxRequests?: number;
};

export function checkRateLimit(key: string, options: RateLimitOptions = {}) {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs
    });

    return {
      allowed: true
    };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: true
  };
}
