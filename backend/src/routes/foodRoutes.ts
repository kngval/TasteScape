import express from "express"
import { getFoodList } from "controllers/foodsController";
const router = express.Router();

router.get('/foodList', getFoodList)