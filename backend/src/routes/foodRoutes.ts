import express from "express"
import {
     getFoodList, 
     createFood,
     updateFood 
    } from "../controllers/foodsController";
    
const router = express.Router();

router.get('/foodlist', getFoodList)
router.post('/foodlist', createFood)
router.patch('/foodlist/:foodId',updateFood)

export default router