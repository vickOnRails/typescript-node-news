import { Request, Response } from "express";
import mongoose from "mongoose";

import News from "../models/news.model";
import Comment from "../models/comment.model";
import { INews } from "../types/INews";
import { response } from "../utils/response";
import { client } from "../server";

/**
 * Get All News
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */

export const GetAllNews = async (req: Request, res: Response) => {
  try {
    // get all news
    const news = await News.find();

    if (news.length > 0) {
      client.setex("news", 3600, JSON.stringify(news));
    }

    // return news
    res.status(200).json(
      response({
        message: "News fetched",
        success: true,
        data: news,
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

/**
 * Add News
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */

export const AddNews = async (req: Request, res: Response) => {
  const { title, content } = req.body as INews;

  // FIXME: use appropriate type
  // @ts-ignore
  const { user } = req;

  try {
    // create news
    const news = await News.create({
      _id: mongoose.Types.ObjectId(),
      title,
      content,
      author: user._id,
    });

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

/**
 * Get News Details
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */
export const GetNewsDetails = async (req: Request, res: Response) => {
  const { newsId } = req.params;

  try {
    // confirm news exists
    const newsExist = await News.exists({ _id: newsId });

    // throw error if it doesn't
    if (!newsExist) {
      throw new Error("News does not exist");
    }

    const news = await News.findById(newsId);

    client.setex(`news-${newsId}`, 3600, JSON.stringify(news));

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

/**
 * Add comments
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */
export const AddComments = async (req: Request, res: Response) => {
  // Ensure the user is signed In
  const { newsId } = req.params;

  const { content } = req.body;

  // @ts-ignore
  // FIXME: use appropriate types
  const { user } = req;

  // ensure a post exists before a comment can be added to it
  try {
    const newsExist = await News.findOne({ _id: newsId });

    if (!newsExist) {
      res.status(401);
      throw new Error("News does not exist");
    }

    // create comment
    const comment = await Comment.create({
      _id: mongoose.Types.ObjectId(),
      content,
      news: newsId,
      author: user._id,
    });

    // save comment
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
