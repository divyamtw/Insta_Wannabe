import { Schema, model } from "mongoose";

const followSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Follower is required"],
    },
    followee: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Followee is required"],
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const Follow = model("Follow", followSchema);

export default Follow;
