import express from "express"
import {
     getFoodList, 
     createFood, 
    } from "../controllers/foodsController";
    
const router = express.Router();

router.get('/foodlist', getFoodList)
router.post('/foodlist', createFood)


export default router