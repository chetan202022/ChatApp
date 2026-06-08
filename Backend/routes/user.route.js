import express from "express";
import {
  signup,
  login,
  logout,
  allUsers,
  verifyEmail,
  getCurrentUser,
} from "../controller/user.controller.js";

import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Get all users
router.get("/allusers", secureRoute, allUsers);

// Email verification
router.get("/verify/:token", verifyEmail);

// Get current logged-in user
router.get("/me", secureRoute, getCurrentUser);

export default router;