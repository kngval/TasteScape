import { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";
import FoodModel, { Food } from "../models/foodSchema";
import LikedModel from "../models/LikedSchema";
import "dotenv/config";

//FOR SEARCHING RECIPES
export const getSearchList = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`)
    const data = response.data.results
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

// CONTROLLER FOR CLICKING A SPECIFIC RECIPE
export const getRecipeDetails = async(req: Request, res: Response) => {
  const  { id } = req.params
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`)
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
  }
}

//LIKING RECIPES
export const addLikedRecipe = async(req:Request,res:Response) => {
    const { id,title,image }:{id:string,title:string, image:string} = req.body
    console.log('Received Data:', { id, title, image });
    try{ 
      const LikedRecipes = await LikedModel.create({
        id,
        title,
        image
      })
      res.status(200).json(LikedRecipes)
    } catch(error) {
      res.status(400).json({error: error.message})
    }
}

//FETCH LIKED RECIPES

  export const fetchLikedRecipe = async(req:Request,res:Response) => {
    try{
      const LikedRecipes  = await LikedModel.find().sort({ createdAt: -1 })
      res.status(200).json(LikedRecipes)
    }catch(error){

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
