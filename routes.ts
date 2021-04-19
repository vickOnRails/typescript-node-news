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

// Authentication routes
// News Routes

router.post("/auth/sign-in", SignIn);
router.post("/auth/sign-up", SignUp);

router.get("/news", GetAllNews);

router.get("/news/:newsId", GetNewsDetails);

// Protect the add comments and add news endpoints
router.post("/news", protect, AddNews);
router.post("/news/:newsId/comments", protect, AddComments);

export default router;
