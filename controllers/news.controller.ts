import { Request, Response } from "express";
import mongoose from "mongoose";

import News from "../models/news.model";
import Comment from "../models/comment.model";
import { INews } from "../types/INews";
import { response } from "../utils/response";

export const GetAllNews = async (req: Request, res: Response) => {
  const news = await News.find();

  res.status(200).json(
    response({
      message: "News fetched",
      success: true,
      data: news,
    })
  );
};

export const AddNews = async (req: Request, res: Response) => {
  const { title, content } = req.body as INews;

  // FIXME: use appropriate type
  // @ts-ignore
  const { user } = req;

  try {
    const news = await News.create({
      _id: mongoose.Types.ObjectId(),
      title,
      content,
      author: user._id,
    });

    // FIXME: Get author Id from JWT token
    await news.save();
    res.status(201).json(
      response({
        success: true,
        message: "News added successfully",
        data: {
          title,
          content,
        },
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        success: false,
        message: err.message,
      })
    );
  }
};

export const GetNewsDetails = async (req: Request, res: Response) => {
  const { newsId } = req.params;

  try {
    const newsExist = await News.exists({ _id: newsId });

    if (!newsExist) {
      throw new Error("News does not exist");
    }

    const news = await News.findById(newsId);

    res.status(200).json(
      response({
        message: "Fetch successfully",
        success: true,
        data: news,
      })
    );
  } catch (err) {
    return res.json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

export const AddComments = async (req: Request, res: Response) => {
  // Ensure the user is signed In
  const { newsId } = req.params;

  //FIXME: refactor to get user from jwt
  const { content } = req.body;

  // @ts-ignore
  const { user } = req;

  // ensure the post their trying to post to exists
  try {
    const newsExist = await News.findOne({ _id: newsId });

    if (!newsExist) {
      res.status(401);
      throw new Error("News does not exist");
    }

    const comment = await Comment.create({
      _id: mongoose.Types.ObjectId(),
      content,
      news: newsId,
      author: user._id,
    });

    await comment.save();

    res.status(201).json(
      response({
        message: "Comment added",
        success: true,
        data: {
          content,
        },
      })
    );
  } catch (err) {
    res.json(
      response({
        success: false,
        message: err.message,
      })
    );
  }
};
