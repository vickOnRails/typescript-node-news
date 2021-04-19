import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullname: string;
  password: string;
  salt: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
