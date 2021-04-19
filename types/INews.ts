import { Document } from "mongoose";

export interface INews extends Document {
  _id: string;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  upate_at: Date;
}
