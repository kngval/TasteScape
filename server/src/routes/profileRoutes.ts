import { protectedRoutes } from "../authMiddleware/authMiddleware";
import { editProfile } from "../controllers/profileControllers";
import express from "express";
const router = express.Router();

router.use(protectedRoutes);
router.patch("/edit-profile",editProfile);

export default router;
