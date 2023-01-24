import { Pool } from "mariadb";
import { posts, users } from "./fakeData";
import { SHA256 } from "crypto-js";

const seedDb = async (redisClient: any, mariaClient: Pool) => {
  await redisClient.select(1);
  const con = await mariaClient.getConnection();
  await con.query("CREATE DATABASE blogish");
  await con.query(
    "CREATE TABLE blogish.users (name varchar(30) not null default('unnamed'),email varchar(120) not null UNIQUE,password char(64) not null,description varchar(50) not null default(''),profileUrl varchar(100) not null default(''),id int not null auto_increment primary key)  ;"
  );
  await con.query(
    'CREATE TABLE blogish.posts (id int not null auto_Increment primary key , postHead varchar(30) not null, postSubhead varchar(50) not null default("") ,tagName varchar(30) ,publishDate Date ,author int not null );'
  );

  users.forEach(async (user) => {
    await con.query(
      "INSERT INTO blogish.users (name,description,password,email) VALUES(?,?,?,?)",
      [
        user.name,
        user.description,
        SHA256(user.password).toString(),
        user.email,
      ]
    );
  });

  posts.forEach(async (post) => {
    await con.query(
      "INSERT INTO blogish.posts (postHead,postSubhead,tagName,publishDate,author) VALUES(?,?,?,?,?)",
      [
        post.postHead,
        post.postSubhead,
        post.tagName,
        post.publishDate,
        post.author.id,
      ]
    );
    await redisClient.set(post.id, post.postDetail);
  });
};

export default seedDb;
