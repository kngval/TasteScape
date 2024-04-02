import RecipeModel from "../models/CreateRecipe";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
interface Recipe {
  title: string;
  description: string;
  // image: string;
  cookingTime: number;
  servings: number;
  healthScore: number;
  ingredients: string[];
  instructions: string[];
  nutrients: string[];
}

//FETCHING ALL RECIPES (GET REQUEST)
export const fetchCreatedRecipes = async (req: Request, res: Response) => {
  try {
    const response = await RecipeModel.find();
    console.log(response);
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "No Recipes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//CREATING RECIPE (POST REQUEST)
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
