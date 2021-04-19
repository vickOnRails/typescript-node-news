import { Request, Response } from "express";

export const GetAllNews = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get All News",
  });
};

export const AddNews = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Add news",
  });
};

export const GetNewsDetails = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get News Details",
  });
};

export const AddComments = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Add comment",
  });
};
