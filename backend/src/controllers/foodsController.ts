import { Request, Response } from "express";
import FoodModel, {Food} from "../models/foodSchema";
import mongoose from "mongoose";

export const getFoodList = async (req: Request, res: Response) => {
  const foodList = await FoodModel.find().sort({ createdAt: -1 });
  res.status(200).json(foodList);
};

export const createFood = async (req: Request, res: Response) => {
  const { foodName, foodDescription } = req.body;

  try {
    const foodCreate = await FoodModel.create({
      foodName,
      foodDescription,
    });
    res.status(200).json(foodCreate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update food interface



export const updateFood = async (req : Request,res: Response) => {
  const { foodId } = req.params;
  const updatedFood: Partial<Food> = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      res.status(404).json({ error: "Not Found" });
      return
    }

    const updatedFoodDocument = await FoodModel.findOneAndUpdate(
        { _id: foodId},
        {$set: updatedFood},
        {new : true}
    );
    if (!updatedFoodDocument) {
        res.status(404).json({ error: "Food not found" });
        return;
      }
    res.status(200).json(updatedFoodDocument);

  } catch (error) {
    console.log("Food Update Error: ", error);
  }
};
