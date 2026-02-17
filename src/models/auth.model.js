import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      lowercase: true,
      trim: true,
      maxlength: [30, "First name can't be more than 30 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      lowercase: true,
      trim: true,
      maxlength: [30, "Last name can't be more than 30 characters long"],
    },
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      unique: [true, "Username already exists"],
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password should be atlease 6 characters long"],
      select: false,
    },
    profileImg: {
      type: String,
      default:
        "https://ik.imagekit.io/cd0pgs18s/default.jpg?updatedAt=1770836318330",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [100, "Bio can only be max 100 charcters long"],
    },
  },
  {
    timestamps: true,
    
    // toJSON : it will remove password field from response , avoid manual picking of filds
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
