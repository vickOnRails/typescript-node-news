import express from "express";

const router = express.Router();
// Authentication routes
// News Routes

router.post("/auth/sign-in", (req, res) => {
  res.status(200).json({
    message: "Sign In",
  });
});

router.post("/auth/sign-up", (req, res) => {
  res.status(200).json({
    message: "Sign Up",
  });
});

export default router;
