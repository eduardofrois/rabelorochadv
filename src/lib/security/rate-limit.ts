type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export function createMemoryRateLimiter(options: RateLimitOptions) {
  const buckets = new Map<string, Bucket>();

  return {
    check(key: string) {
      const now = Date.now();
      const current = buckets.get(key);

      if (!current || current.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + options.windowMs });
        return { allowed: true, remaining: options.limit - 1 };
      }

      if (current.count >= options.limit) {
        return { allowed: false, remaining: 0 };
      }

      current.count += 1;
      return { allowed: true, remaining: options.limit - current.count };
    },
  };
}

export const contactRateLimiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
export const loginRateLimiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
