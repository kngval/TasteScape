import { protectedRoutes } from "../authMiddleware/authMiddleware";
import { editProfile, getProfile } from "../controllers/profileControllers";
import express from "express";
const router = express.Router();

router.use(protectedRoutes);
router.patch("/edit-profile",editProfile);
router.get("/",getProfile);


export default router;
