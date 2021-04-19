import express from "express";
import {
  AddComments,
  GetAllNews,
  GetNewsDetails,
  AddNews,
} from "./controllers";
import { SignIn, SignUp } from "./controllers/auth.controller";
import { protect } from "./middleware/protect";

const router = express.Router();

// --------------------------------------------------------------------------------------------- //
// Authentication routes
// --------------------------------------------------------------------------------------------- //

// User sign in
router.post("/auth/sign-in", SignIn);

// User sign up
router.post("/auth/sign-up", SignUp);

// --------------------------------------------------------------------------------------------- //
// News Routes
// --------------------------------------------------------------------------------------------- //

// route to get all news
router.get("/news", GetAllNews);

// route to get single news details
router.get("/news/:newsId", GetNewsDetails);

// Add news route (Protect)
router.post("/news", protect, AddNews);

// Add news comments (Protect)
router.post("/news/:newsId/comments", protect, AddComments);

export default router;
