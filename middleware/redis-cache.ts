import { NextFunction, Response, Request } from "express";
import { client } from "../server";
import { response } from "../utils/response";

export const allNewsCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  client.get("news", (err, dataStr) => {
    if (err) throw err;

    if (dataStr) {
      const data = JSON.parse(dataStr);
      res.status(200).json(
        response({
          success: true,
          message: "News fetched",
          data,
        })
      );
    } else {
      next();
    }
  });
};

export const newsDetailsCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newsId } = req.params;
  client.get(`news-${newsId}`, (err, dataStr) => {
    if (err) throw err;

    if (dataStr) {
      const data = JSON.parse(dataStr);
      res.status(200).json(
        response({
          success: true,
          message: "News details fetched",
          data,
        })
      );
    } else {
      next();
    }
  });
};
