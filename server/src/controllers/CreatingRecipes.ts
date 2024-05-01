import { getDb } from "../db/db";
import { Request, Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import cloudinary from "../utils/cloudinary";
import RecipeModel from "../models/CreateRecipe";
interface Recipe {
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  servings: number;
  healthScore: number;
  ingredients: string[];
  instructions: string[];
  nutrients: string[];
}

// FETCHING ALL RECIPES (GET REQUEST)
export const fetchCreatedRecipes = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const collection: Collection<Document> = db.collection("createdrecipes");
    const response = await collection.find().sort({ createdAt: -1 }).toArray();
    console.log(response);
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "No Recipes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// CREATING RECIPE (POST REQUEST)
export const createRecipe = async (req: Request, res: Response) => {
  const recipeData: Recipe = req.body;
  try {
    const db = getDb();
    const recipeImg = recipeData.image;
    const imgResponse = await cloudinary.uploader.upload(recipeImg, {
      upload_preset: "tastescape",
    });
    recipeData.image = imgResponse.url;

    const newRecipe = await db
      .collection("createdrecipes")
      .insertOne(recipeData);

    newRecipe
      ? res
          .status(200)
          .json({ message: "Recipe Created Successfully", recipe: recipeData })
      : res.status(500).json({ error: "Failed to Create Recipe" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
};

//CREATED RECIPES DETAILS
export const fetchCreatedRecipeDetails = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const db = getDb();
    const ClickedRecipe = await db
      .collection("createdrecipes")
      .find({ _id: new ObjectId(id) })
      .toArray();
    console.log(ClickedRecipe);
    ClickedRecipe
      ? res.status(200).json(ClickedRecipe)
      : res.status(500).json({ error: "Failed to fetch Created Recipe" });
  } catch (error) {
    console.log(error);
  }
};

export const getCreatedRecipeDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = getDb();
    const response = await db
      .collection("createdrecipes")
      .findOne({ _id: new ObjectId(id) });
    console.log(response);
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "Nothing found in db..." });
  } catch (error) {
    console.log(error);
  }
};
