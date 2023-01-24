import { RedisClientType } from "redis";
import prepareTestDbEnvironment from "../../scripts/initial";
import { posts, users } from "../../scripts/fakeData";

const fakeUser1 = users[0];
const fakeUser2 = users[1];

const fakePost1 = posts[0];
const fakePost2 = posts[1];

let redisClient: any;

describe("Test : DB", () => {
  beforeAll(async () => {
    const { redisClient, mariaClient } = await prepareTestDbEnvironment();
    console.log(redisClient, mariaClient);
  });
  it("get Random user!", async () => {});
});
