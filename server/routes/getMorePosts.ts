import getPostList from "../../db/util/getPostList";
import { Request, Response } from "express";

const getMorePosts = async (req: Request, res: Response) => {
  const { len } = req.query;
  const posts = await getPostList(len);
  res.send(posts);
};

export default getMorePosts;
