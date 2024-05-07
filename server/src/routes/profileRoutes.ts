import { editProfile } from "../controllers/profileControllers";
import express from "express";
const router = express.Router();


router.patch("/edit-profile", editProfile);

export default router;
