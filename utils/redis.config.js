const { createClient } = require("redis");

const redisConnect = async () => {
   const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

   await client.connect();
   return client;
};
exports.Redis = redisConnect;