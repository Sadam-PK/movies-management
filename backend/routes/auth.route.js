import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("hello from sign up");
});

router.get("/login", (req, res) => {
  res.send("hello from login route");
});

export default router;
