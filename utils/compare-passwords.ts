import bcrypt from "bcryptjs";
import { IUser } from "../types/IUser";

/**
 * comparePasswords - compares password in database with user provided password
 * @param { string } password - user provided password
 * @param { IUser } res - user object from database
 * @returns { boolean } passwordsMatch
 */
export const comparePasswords = async (password: string, user: IUser) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    throw new Error(err.message);
  }
};
