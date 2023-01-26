import publishChangeToArticle from "../../db/util/publishChangeToArticle";
import publishNewArticle from "../../db/util/publishNewArticle";
import { Request, Response } from "express";

const publish = async (req: Request, res: Response) => {
  let result;
  if (req.query && req.query.edit) {
    result = await publishChangeToArticle(req.body);
  } else {
    result = await publishNewArticle(req.body);
  }
  res.send(result);
};

export default publish;
