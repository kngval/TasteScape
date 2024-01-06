import express from "express"
const router = express.Router();


import {
    getSearchList
} from "../controllers/foodsController"


router.get('/:query', getSearchList);

export default router;