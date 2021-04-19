import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user.model";
import { IUser } from "../types/IUser";
import { comparePasswords } from "../utils/compare-passwords";
import { encryptPassword } from "../utils/encrypt-password";
import { generateJWT } from "../utils/generate-jwt";
import { response } from "../utils/response";

/**
 * Sign In user
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */

export const SignIn = async (req: Request, res: Response) => {
  const { password, email } = req.body as IUser;

  // ensure user sends email and password
  if (!password || !email) {
    res.status(400).json(
      response({
        success: false,
        message: "Please pass in an email and password",
      })
    );
  }

  try {
    // confirm user exists
    const user = await User.findOne({ email });
    const authErrMessage = `This user does not exist. Please create an account`;

    // return error if user does not exist
    if (!user) {
      return res.status(401).json(
        response({
          success: false,
          message: authErrMessage,
        })
      );
    }

    // check user password against provided one
    const passwordsMatch = await comparePasswords(password, user);

    // return error if passwords don't match
    if (!passwordsMatch) {
      return res.status(401).json(
        response({
          success: false,
          message: authErrMessage,
        })
      );
    }

    // success ✅
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

/**
 * Sign Up user
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */
export const SignUp = async (req: Request, res: Response) => {
  const { email, password, fullname } = req.body as IUser;

  // confirm user exists
  const userExists = await User.exists({ email });

  // throw error if the user already exists
  if (userExists) {
    res.status(422).json(
      response({
        success: false,
        message:
          "A user already exists with this email address. Please log in to continue",
      })
    );
  }

  // encrypt the user password
  const { hashedPassword, salt } = await encryptPassword(password);

  try {
    // create user
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
