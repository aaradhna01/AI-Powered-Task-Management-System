const redis = require("../config/redis");

async function cacheSet(key, value, ttl = 3600) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

async function cacheGet(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

async function cacheDel(key) {
  await redis.del(key);
}

module.exports = { cacheSet, cacheGet, cacheDel };
