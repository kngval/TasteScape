import express from "express";

import { fetchLikedRecipe, removeLikedRecipe } from '../controllers/foodsController'

const router = express.Router();

router.get('/', fetchLikedRecipe)
router.delete('/liked-recipes/:id', removeLikedRecipe)
export default router;