import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const generatetoken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(400).json({ message: "All Field Must be Filled" });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Verify password using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password); // Compare plain password with hashed password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = generatetoken(user);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d Ms
      httpOnly: true, // prevent Xss attacks cross-site scripting
      sameSite: "strict", // CSRF attacks cross-site request
      secure: process.env.NODE_ENV !== "development",
    });

    // Return success response with token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Problem in Login Controller");
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Length Must be Greater than 5" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User with this email Already Exist");

      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    // Create new user with "user" role
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // Always set role to "user"
      cart: [],
    });
    await user.save();

    const token = generatetoken(user);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d Ms
      httpOnly: true, // prevent Xss attacks cross-site scripting
      sameSite: "strict", // CSRF attacks cross-site request
      secure: process.env.NODE_ENV !== "development",
    });
    // Return success response with token and user data
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Problem in SignUp Controller");
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookies("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logout Succesfully",
    });
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({ message: error.message });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { login, signup, logout, checkAuth };
