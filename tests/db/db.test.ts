import prepareTestDbEnvironment from "../../scripts/initial";
import { PoolConnection } from "mariadb";
import { postFields, userFields } from "./dbFields";
import { SHA256 } from "crypto-js";

let redisClient: any;
let mariaClient: PoolConnection;

describe("Test : DB", () => {
  beforeAll(async () => {
    const clients = await prepareTestDbEnvironment();
    mariaClient = await clients.mariaClient.getConnection();
    redisClient = clients.redisClient;
  });
  it("Test If Database Created ", async () => {
    const databases = await mariaClient.query("SHOW DATABASES");
    const res = databases.filter((db: { Database: string }) => {
      return db.Database === "blogish";
    });
    expect(res).toHaveLength(1);
  });

  it("Test if Tables Are Created", async () => {
    const tables = await mariaClient.query("SHOW TABLES from blogish");
    const res = tables.filter((table: { Tables_in_blogish: string }) => {
      return (
        table.Tables_in_blogish === "posts" ||
        table.Tables_in_blogish === "users"
      );
    });
    expect(res).toHaveLength(2);
  });
  it("Test MARIADB Fields: USER TABLE", async () => {
    const users = await mariaClient.query("DESCRIBE blogish.users");

    users.forEach((user: any) => {
      const tmp: any = userFields[user.Field as keyof typeof userFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(user[tmpKey]);
      });
    });
  });
  it("Test MARIADB Fields: Posts TABLE", async () => {
    const posts = await mariaClient.query("DESCRIBE blogish.posts");

    posts.forEach((post: any) => {
      const tmp: any = postFields[post.Field as keyof typeof postFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(post[tmpKey]);
      });
    });
  });

  it("Test Insert To MARIADB : user ", async () => {
    await mariaClient.query(
      "INSERT INTO blogish.users (name,description,password,email) VALUES(?,?,?,?)",
      [
        "Siavash",
        "my bioGraphy",
        SHA256("123123").toString(),
        "someMagicEmail@gmail.com",
      ]
    );
    let user = await mariaClient.query(
      'SELECT * FROM blogish.users WHERE name="Siavash" and email="someMagicEmail@gmail.com"'
    );
    expect(user).toHaveLength(1);
    user = user[0];
    expect(user.name).toEqual("Siavash");
    expect(user.email).toEqual("someMagicEmail@gmail.com");
    expect(user.description).toEqual("my bioGraphy");
    expect(user.profileUrl).toEqual("");
    expect(user.password).toEqual(SHA256("123123").toString());
    // expect(user.id).toEqual('4') //! this is uncertain!
  });

  it("Test Insert To MARIADB : if user with same email insert mariadb will throw error ", async () => {
    try {
      await mariaClient.query(
        "INSERT INTO blogish.users (name,description,password,email) VALUES(?,?,?,?)",
        [
          "Majid",
          "my bioGraphy",
          SHA256("123123").toString(),
          "someMagicEmail@gmail.com",
        ]
      );
    } catch (err) {}
    let user = await mariaClient.query(
      'SELECT * FROM blogish.users WHERE name="Majid" and email="someMagicEmail@gmail.com"'
    );
    expect(user).toHaveLength(0);
  });
});
