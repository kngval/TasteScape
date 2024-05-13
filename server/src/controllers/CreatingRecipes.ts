import { getDb } from "../db/db";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import cloudinary from "../utils/cloudinary";
interface Recipe {
  title: string;
  description: string;
  cuisineType: string;
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
    const response = await db
      .collection("createdrecipes")
      .find({ user: req.user.userId });
    // const response = await collection.find().sort({ createdAt: -1 }).toArray();
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
  const {
    title,
    description,
    cuisineType,
    image,
    cookingTime,
    servings,
    healthScore,
    ingredients,
    instructions,
    nutrients,
  }: Recipe = req.body;
  try {
    const db = getDb();
    const imgResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "tastescape",
    });

    const newRecipe = await db.collection("createdrecipes").insertOne({
      title,
      description,
      cuisineType,
      image: imgResponse.secure_url,
      cookingTime,
      servings,
      healthScore,
      ingredients,
      instructions,
      nutrients,
      createdAt: new Date(),
    });

    newRecipe
      ? res
          .status(200)
          .json({ message: "Recipe Created Successfully", newRecipe })
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

//DELETE CREATED RECIPE
export const deleteCreatedRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = getDb();
    const response = await db
      .collection("createdrecipes") // Target the "likedrecipes" collection
      .deleteOne({ _id: new ObjectId(id) }); // Delete the recipe by its ID
    console.log(response);
    if (response.deletedCount === 1) {
      res.status(200).json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
