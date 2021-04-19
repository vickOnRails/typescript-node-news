import { Request, Response } from "express";

export const SignIn = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Sign In",
  });
};

export const SignUp = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Sign Up",
  });
};
