import express from "express";
const router = express.Router();

import { createRecipe, fetchCreatedRecipes } from "../controllers/CreatingRecipes";

router.get('/',fetchCreatedRecipes)
router.post('/createRecipe', createRecipe);


export default router;
