import express from "express";

import { fetchLikedRecipe } from '../controllers/foodsController'

const router = express.Router();

router.get('/',fetchLikedRecipe)

export default router;