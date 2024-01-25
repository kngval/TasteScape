import express from "express"
const router = express.Router();


import {
    getSearchList,
    getRecipeDetails
} from "../controllers/foodsController"


router.get('/:query', getSearchList);
router.get('/recipe/:id', getRecipeDetails);



export default router;