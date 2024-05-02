import express from "express";
const router = express.Router();

import { addLikedCreatedRecipe, createRecipe, deleteCreatedRecipe, fetchCreatedRecipes, getCreatedRecipeDetails } from "../controllers/CreatingRecipes";

router.get('/',fetchCreatedRecipes)
router.post('/createRecipe', createRecipe);
router.get('/:id',getCreatedRecipeDetails);
router.delete('/:id', deleteCreatedRecipe);
router.post('/', addLikedCreatedRecipe);

export default router;
