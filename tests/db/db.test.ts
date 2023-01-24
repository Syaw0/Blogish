import { RedisClientType } from "redis";
import prepareTestDbEnvironment from "../../scripts/initial";

let redisClient: any;

describe("Test : DB", () => {
  beforeAll(async () => {
    redisClient = await prepareTestDbEnvironment();
  });
  it("some test", async () => {
    let redisClient2: RedisClientType = redisClient;
    await redisClient2.select(1);
    const d = await redisClient2.hGetAll("0");
    console.log(d);
  });
});
