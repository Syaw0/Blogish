import { pool } from "../dbController";

const getPostList = async (limit: number) => {
  const con = await pool.getConnection();
  const data = await con.query(
    ` select t1.postHead,concat('')as postDetail ,t1.tagName,DATE_FORMAT(t1.publishDate,'%M %d') as publishDate ,t1.postSubhead ,t1.postId as id,concat('{','"name":','"',t2.name,'"',',','"id":','"',t2.userId,'"',',"description":','"',t2.description,'"',',','"profileUrl":',t2.profileUrl,"}") as author from posts as t1 left join users as t2 on t1.author = t2.userId order by publishDate Desc Limit ${limit},10 ;`
  );
  await con.end();
  return data;
};

export default getPostList;
