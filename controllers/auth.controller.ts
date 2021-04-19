import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user.model";
import { IUser } from "../types/IUser";
import { comparePasswords } from "../utils/compare-passwords";
import { encryptPassword } from "../utils/encrypt-password";
import { generateJWT } from "../utils/generate-jwt";
import { response } from "../utils/response";

export const SignIn = async (req: Request, res: Response) => {
  const { password, email } = req.body as IUser;

  if (!password || !email) {
    res.status(400).json(
      response({
        success: false,
        message: "Please pass in an email and password",
      })
    );
  }

  // confirm user exists
  const user = await User.findOne({ email });

  const passwordsMatch = await comparePasswords(password, user);

  try {
    if (!user || !passwordsMatch) {
      return res.status(401).json(
        response({
          success: false,
          message: "This user does not exist. Please create an account",
        })
      );
    }

    res.status(200).json(
      response({
        success: true,
        message: "Login successfull",
        data: {
          jwt: generateJWT({ id: user._id }),
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

export const SignUp = async (req: Request, res: Response) => {
  // destructure parameters to create account
  const { email, password, fullname } = req.body as IUser;

  const userExists = await User.exists({ email });

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

  const { hashedPassword, salt } = await encryptPassword(password);

  try {
    const newUser = await User.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
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
