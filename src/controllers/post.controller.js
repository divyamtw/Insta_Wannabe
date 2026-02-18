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

export { createPost };
