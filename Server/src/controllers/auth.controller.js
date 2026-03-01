import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (
      [firstname, lastname, username, email, password].some(
        (field) => !field || String(field).trim() === "",
      )
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const isUserExists = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message:
          isUserExists.email === normalizedEmail
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const user = await User.create({
      firstname: firstname.trim().toLowerCase(),
      lastname: lastname.trim().toLowerCase(),
      username: normalizedUsername,
      email: normalizedEmail,
      password: password.trim(),
    });

    if (user) {
      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      [email, password].some((fields) => !fields || String(fields).trim === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid User Credentials" });
    }

    const isPasswordCorrect = user.isPasswordMatch(password.trim());
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid User Credentials" });
    }

    const accessToken = generateAccessToken(user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User login Successfully!", user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while login user" });
  }
};

const logoutUser = async (req, res) => {};

const getUserProfile = async (req, res) => {};

export { registerUser, loginUser, logoutUser, getUserProfile };
