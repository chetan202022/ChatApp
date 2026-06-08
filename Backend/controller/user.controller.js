import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already registered",
      });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    // Verification token generate
    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      verificationToken,
      isVerified: false,
    });

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(
      email,
      verificationToken
    );

    res.status(201).json({
      message:
        "Signup successful. Please verify your email.",
    });

  } catch (error) {
    console.log("Signup Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ================= VERIFY EMAIL + AUTO LOGIN =================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user using verification token
    const user = await User.findOne({
      verificationToken: token,
    });

    // Invalid token check
    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired verification token",
      });
    }

    // Already verified case
    if (user.isVerified) {
      createTokenAndSaveCookie(user._id, res);

      return res.redirect(
        "http://localhost:3001/verify-success"
      );
    }

    // Verify user
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    // Create JWT cookie
    createTokenAndSaveCookie(user._id, res);

    // Redirect to verify-success page
    return res.redirect(
      "http://localhost:3001/verify-success"
    );

  } catch (error) {
    console.log("Verify Email Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ================= GET CURRENT USER =================
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.log("Get Current User Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Email verification check
    if (!user.isVerified) {
      return res.status(400).json({
        error:
          "Please verify your email first",
      });
    }

    // Password compare
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Create JWT cookie
    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({
      message: "User logged out successfully",
    });

  } catch (error) {
    console.log("Logout Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ================= ALL USERS =================
export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.log(
      "Error in allUsers Controller:",
      error
    );

    res.status(500).json({
      error: "Internal server error",
    });
  }
};