import { NextFunction, Response, Request } from "express";
import { client } from "../server";
import { response } from "../utils/response";

/**
 *  Acts as a filter for requests without the jwt token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export const newsCache = async (
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
