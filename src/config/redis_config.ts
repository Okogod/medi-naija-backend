import { createClient } from 'redis';

const redisClient = createClient();


redisClient.connect()
  .then()
  .catch((err) => console.error('Redis Connection Error', err));

export default redisClient;