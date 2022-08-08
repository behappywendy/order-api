import { createClient } from 'redis';

const client = createClient({
  url: `redis://${process.env.REDIS}:6379`,
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

export default client;
