import { Request, Response } from "express"
import FoodModel from "../models/foodSchema"

export const getFoodList = async(req : Request,res : Response) =>{

    const foodList = await FoodModel.find().sort({createdAt: -1})
    res.status(200).json(foodList)
}

export const createFood = async(req:Request, res: Response) =>{
    const { foodName , foodDescription } = req.body

    try{
        const foodCreate = await FoodModel.create({
            foodName,
            foodDescription
        })   
        res.status(200).json(foodCreate);
    } catch (error){
        res.status(400).json({error : error.message})
    }
    
}

