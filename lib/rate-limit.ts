const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });

    return {
      allowed: true
    };
  }

  if (current.count >= MAX_REQUESTS) {
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

