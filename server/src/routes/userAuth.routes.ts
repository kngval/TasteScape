import { loginUser, signupUser } from "../controllers/userAuth.controller";
import express from "express";
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;
