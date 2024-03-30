import RecipeModel from "../models/CreateRecipe";
import { Request, Response } from "express";

interface Recipe {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  healthScore: number;
  ingredients: string[];
  instructions: string[];
  nutrients: string[];
}

export const createRecipe = async (req: Request, res: Response) => {
  const recipe: Recipe = req.body;

  try {
    if (recipe) {
      const response = await RecipeModel.create(recipe);
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "No Recipe Data Added" });
    }
  } catch (error) {
    console.log(error);
  }
};
