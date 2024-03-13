// Import the Redis library
const redis = require('redis');

// Create the RedisClient class
class RedisClient {
 constructor() {
    // Create a connection to Redis and handle errors
    this.client = redis.createClient();
    this.client.on('error', (err) => console.error('Redis Client Error', err));
 }

 // Check if the connection is alive
 isAlive() {
    return this.client.connected;
 }

 // Get a value from Redis
 async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
 }

 // Set a value in Redis with an expiration
 async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
 }

 // Delete a value from Redis
 async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
 }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;

