import express from "express";
const router = express.Router();

import {
  createRecipe,
  deleteCreatedRecipe,
  fetchCreatedRecipes,
  getCreatedRecipeDetails,
} from "../controllers/CreatingRecipes";
import { protectedRoutes } from "../authMiddleware/authMiddleware";

router.use(protectedRoutes);

router.get("/",fetchCreatedRecipes);
router.post("/createRecipe", createRecipe);
router.get("/:id", getCreatedRecipeDetails);
router.delete("/:id", deleteCreatedRecipe);

export default router;
