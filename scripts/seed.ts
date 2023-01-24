import { Pool } from "mariadb";

const seedDb = async (redisClient: any, mariaClient: Pool) => {
  // we store article contents in DB Index 1 and
  // session in DB Index 2
  await redisClient.select(1);
  const con = await mariaClient.getConnection();
  await con.query("CREATE DATABASE blogish");
  await con.query(
    "CREATE TABLE blogish.users (name varchar(30) not null default('unnamed'),email varchar(120) not null UNIQUE,password char(64) not null,description varchar(50) not null default(''),profileUrl varchar(100) not null default(''),userId int not null auto_increment primary key)  ;"
  );
  await con.query(
    'CREATE TABLE blogish.posts (postId int not null auto_Increment primary key , postHead varchar(30) not null, postSubhead varchar(50) not null default("") ,tagName varchar(30) ,publishDate Date ,author int not null );'
  );
};

export default seedDb;
