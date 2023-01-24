import { posts, users } from "./fakeData";

const seedDb = async (redisClient: any) => {
  await redisClient.select(1);
  users.forEach(async (user) => {
    await redisClient.hSet(`${user.id}`, [
      "name",
      user.name,
      "description",
      user.description,
      "profileUrl",
      user.profileUrl,
      "id",
      user.id,
      "posts",
      JSON.stringify({ posts: user.posts }),
    ]);
  });
  await redisClient.select(2);
  posts.forEach(async (post) => {
    await redisClient.hSet(`${post.id}`, [
      "author",
      post.author.id,
      "postSubhead",
      post.postSubhead,
      "postHead",
      post.postHead,
      "postDetail",
      post.postDetail,
      "id",
      post.id,
      "tagName",
      post.tagName,
      "publishDate",
      post.publishDate.getTime(),
    ]);
  });
};

export default seedDb;
