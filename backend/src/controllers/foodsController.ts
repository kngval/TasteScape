import { Request, Response } from "express"
import FoodModel from "models/foodSchema"

export const getFoodList = async(req : Request,res : Response) =>{

    const foodList = await FoodModel.find().sort({createdAt: -1})
    res.status(200).json(foodList)
}

