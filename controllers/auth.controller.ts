import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user.model";
import { IUser } from "../types/User";
import { response } from "../utils/response";

export const SignIn = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Sign In",
  });
};

export const SignUp = async (req: Request, res: Response) => {
  console.log(req.body);
  // destructure parameters to create account
  const { email, password, fullname } = req.body as IUser;

  const userExists = await User.exists({ email });
  const salt = "anything salty";

  // FIXME:
  if (userExists) {
    res.status(422).json(
      response({
        success: false,
        message:
          "A user already exists with this email address. Please log in to continue",
      })
    );
  }

  try {
    const newUser = await User.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password,
      fullname,
      salt,
    });

    await newUser.save();

    return res.status(201).json(
      response({
        success: true,
        data: {
          user: {
            email: newUser.email,
            fullname: newUser.fullname,
          },
        },
        message: "User create successfully",
      })
    );
  } catch (err) {
    response({
      success: false,
      message: err.message,
    });
  }
};
