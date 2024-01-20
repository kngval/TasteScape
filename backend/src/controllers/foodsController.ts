import { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";
import FoodModel, { Food } from "../models/foodSchema";
import "dotenv/config";

//FOR SEARCHING RECIPES
export const getSearchList = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`
    https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}
    `);
    const data = response.data.hits
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}


//FOR CREATING YOUR OWN RECIPES
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

export const updateFood = async (req: Request, res: Response) => {
  const { foodId } = req.params;
  const updatedFood: Partial<Food> = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      res.status(404).json({ error: "Not Found" });
      return;
    }

    const updatedFoodDocument = await FoodModel.findOneAndUpdate(
      { _id: foodId },
      { $set: updatedFood },
      { new: true }
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
