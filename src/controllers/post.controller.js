import Post from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import User from "../models/auth.model.js";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req?.user.userId);
    if (!user) {
      return res.status(400).json({ message: "Unauthorized!" });
    }

    let uploadedFile;

    if (req.file) {
      uploadedFile = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "post-img",
        folder: `Insta-Wannabe/${user._id}/posts`,
      });
    }

    const post = await Post.create({
      caption: req.body.caption,
      img: uploadedFile?.url,
      user: user._id,
    });

    if (post) {
      return res
        .status(201)
        .json({ message: "Post created successfully!", post });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while creating post" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ user: req?.user.userId });
    if (posts.length === 0) {
      return res
        .status(200)
        .json({ message: "User has not posted anything yet" });
    }

    return res
      .status(200)
      .json({ message: "All posts fetched successfully", posts });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching all posts" });
  }
};

const getPostDetails = async (req, res) => {
  try {
    const userId = req?.user.userId;
    const postId = req.params;

    const post = Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({ message: "Forbidden Content" });
    }

    return res
      .status(200)
      .json({ message: "Post fetched successfully!", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching post" });
  }
};

export { createPost, getAllPost, getPostDetails };
