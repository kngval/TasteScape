import RecipeModel from "../models/CreateRecipe";
import { Request, Response } from "express";

interface Recipe {
  title: string;
  description: string;
  image: Buffer | string;
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

const base64Encode = (file: Buffer) => {
  return file.toString("base64");
};

//CREATING RECIPE (POST REQUEST)
export const createRecipe = async (req: Request, res: Response) => {
  const recipeData: Recipe = req.body;
  console.log("Request Body : ", req.body);
  const imageBase64 =
    typeof recipeData.image === "string"
      ? recipeData.image
      : base64Encode(recipeData.image as Buffer);
  recipeData.image = imageBase64;
  try {
    if (recipeData) {
      console.log("image :", recipeData.image);

      const response = await RecipeModel.create(recipeData);
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "No Recipe Data Added" });
    }
  } catch (error) {
    console.log(error);
  }
};
