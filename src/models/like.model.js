import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      requied: [true, "post id is required for creating a like"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required for creating a like"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = model("Like", likeSchema);

export default Like;
