class TokenBucket {
  constructor(capacity, fillPerSecond) {
    this.capacity = capacity;
    this.fillPerSecond = fillPerSecond;
    this.tokens = capacity;
    this.lastFilled = Date.now();
  }

  consume(count = 1) {
    const now = Date.now();
    const elapsedTimeInSeconds = (now - this.lastFilled) / 1000;

    if (elapsedTimeInSeconds > 0) {
      const tokensToAdd = elapsedTimeInSeconds * this.fillPerSecond;
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastFilled = now;
    }

    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }
}

// Store buckets in memory
const userBuckets = new Map();

// Cleanup stale buckets every 15 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of userBuckets.entries()) {
    // If a bucket hasn't been touched in 15 minutes, delete it
    if (now - bucket.lastFilled > 15 * 60 * 1000) {
      userBuckets.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Creates a rate limiting middleware
 * @param {number} capacity - Max burst of requests allowed
 * @param {number} fillRate - How many requests replenish per second
 */
export const createRateLimiter = (capacity, fillRate) => {
  return (req, res, next) => {
    // Use req.user.id if available (from your auth middleware), otherwise fallback to IP
    const identifier = req.user?.id || req.ip;

    if (!userBuckets.has(identifier)) {
      userBuckets.set(identifier, new TokenBucket(capacity, fillRate));
    }

    const bucket = userBuckets.get(identifier);

    if (bucket.consume(1)) {
      // Optional: Tell the frontend how many requests they have left in this burst
      res.setHeader('X-RateLimit-Remaining', Math.floor(bucket.tokens));
      next();
    } else {
      res.status(429).json({
        message: "Too many requests. Please slow down and try again later."
      });
    }
  };
};