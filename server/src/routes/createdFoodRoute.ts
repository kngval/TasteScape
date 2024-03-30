import express from "express";
const router = express.Router();

import { createRecipe } from "../controllers/CreatingRecipes";

router.post('/createRecipe', createRecipe);



export default router;
