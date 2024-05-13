import express from "express";

import {
  fetchLikedRecipe,
  removeLikedRecipe,
} from "../controllers/foodsController";
import { protectedRoutes } from "../authMiddleware/authMiddleware";

const router = express.Router();
router.use(protectedRoutes);
router.get("/",  fetchLikedRecipe);
router.delete("/:id",  removeLikedRecipe);
export default router;
