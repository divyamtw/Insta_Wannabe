import mongoose from "mongoose";
import User from "../models/auth.model.js";
import Follow from "../models/follow.model.js";

const followUser = async (req, res) => {
  try {
    const followerId = req.user.userId.trim();
    const followeeId = req.params.userId.trim();

    if (!mongoose.Types.ObjectId.isValid(followeeId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const isFolloweeExists = await User.findOne({ _id: followeeId });
    if (!isFolloweeExists) {
      return res
        .status(404)
        .json({ message: "User you are trying follow does not exists" });
    }

    if (followerId === followeeId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const isAlreadyFollowing = await Follow.findOne({
      follower: followerId,
      followee: followeeId,
    });

    if (isAlreadyFollowing) {
      return res.status(200).json({
        message: `You are already following ${followeeId}`,
        follow: isAlreadyFollowing,
      });
    }

    const followRec = await Follow.create({
      follower: followerId,
      followee: followeeId,
    });

    return res.status(201).json({
      message: `You are now following ${followeeId}`,
      follow: followRec,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while following user" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.userId.trim();
    const followeeId = req.params.userId.trim();

    if (!mongoose.Types.ObjectId.isValid(followeeId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const isUserFollowing = await Follow.findOne({
      follower: followerId,
      followee: followeeId,
    });

    if (!isUserFollowing) {
      return res
        .status(200)
        .json({ message: `You are not following ${followeeId}` });
    }

    await Follow.findByIdAndDelete(isUserFollowing._id);

    return res
      .status(200)
      .json({ message: `You have un-followed ${followeeId}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while un-following user" });
  }
};

export { followUser, unfollowUser };
