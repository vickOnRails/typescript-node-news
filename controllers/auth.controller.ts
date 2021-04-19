import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user.model";
import { IUser } from "../types/User";

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
  if (userExists)
    throw new Error(
      "A user already exists with this email address. Please log in"
    );

  try {
    const newUser = await User.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password,
      fullname,
      salt,
    });

    await newUser.save();

    res.status(201).json({
      message: "User create successfully",
      newUser,
    });
  } catch (err) {
    throw new Error(err.message);
  }

  res.status(200).json({
    message: "Sign Up",
  });
};
