import User from "../models/auth.model.js";

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

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

const getUserProfile = async (req, res) => {};

export { registerUser, loginUser, logoutUser, getUserProfile };
