import express from "express";
const router = express.Router();

import { createRecipe, fetchCreatedRecipes, getCreatedRecipeDetails } from "../controllers/CreatingRecipes";

router.get('/',fetchCreatedRecipes)
router.post('/createRecipe', createRecipe);
router.get('/:id',getCreatedRecipeDetails);

export default router;
