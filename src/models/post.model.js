import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "userId is required for creating a post"],
    },
  },
  { timestamps: true },
);

const Post = model("Post", postSchema);

export default Post;
