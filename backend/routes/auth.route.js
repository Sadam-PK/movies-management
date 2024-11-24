import express from "express";
import { signup, login, me } from "../controllers/auth.controller.js";
import {authenticateJwt} from '../middleware/user.authenticate.js';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/me",  authenticateJwt, me)

export default router;
