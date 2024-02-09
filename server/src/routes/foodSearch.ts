import express from "express"
const router = express.Router();


import {
    getSearchList,
    getRecipeDetails,
    addLikedRecipe,
    fetchRandomRecipe
} from "../controllers/foodsController"


router.get('/', fetchRandomRecipe);
router.get('/:query', getSearchList);
router.get('/recipe/:id', getRecipeDetails);
router.post('/', addLikedRecipe);


export default router;