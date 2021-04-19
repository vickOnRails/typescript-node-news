import express from "express";
import {
  AddComments,
  GetAllNews,
  GetNewsDetails,
  AddNews,
} from "./controllers";
import { SignIn, SignUp } from "./controllers/auth.controller";

const router = express.Router();
// Authentication routes
// News Routes

router.post("/auth/sign-in", SignIn);
router.post("/auth/sign-up", SignUp);

router.get("/news", GetAllNews);
router.post("/news", AddNews);
router.get("/news/:newsId", GetNewsDetails);
router.post("/news/:newsId/comments", AddComments);

export default router;
