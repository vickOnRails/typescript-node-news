import mongoose from "mongoose";

// TODO: Add comments to all these models
const commentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "User",
      required: true,
    },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      rel: "News",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
