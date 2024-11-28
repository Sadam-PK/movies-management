import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // ####### token ##### jwt #####
    const token = jwt.sign({ name, email }, SECRET, { expiresIn: "1h" });

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If no user is found, return an error response
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // If password does not match, return an error response
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Generate a JWT token if credentials are valid
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      SECRET,
      {
        expiresIn: "1hr",
      }
    );

    // Return success response with token
    return res
      .status(200)
      .json({ status: true, message: "Logged in successfully", token });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({ status: false, message: error.message });
  }
};


export const me = async (req, res) => {
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    //  user.password = undefined; // password not needed and shouldnt be sent

    return res.status(200).json({
      status: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
