import { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import { getDb } from "../db/db";
import { ObjectId } from "mongodb";

//FOR SEARCHING RECIPES
interface SearchList {
  id: string;
  title: string;
  image: string;
  isLiked: boolean;
}

//FETCH TRENDING RECIPES
export const fetchRandomRecipe = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`
    );
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getSearchList = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`
    );
    const apiData: SearchList[] = response.data.results;

    // Fetch liked recipes from the database
    const likedRecipeIds = (
      await db
        .collection("likedrecipes")
        .find({}, { projection: { id: 1 } })
        .toArray()
    ).map((likedRecipe) => likedRecipe.id);

    // Add isLiked property based on whether the recipe is liked
    const recipeData: SearchList[] = apiData.map((recipe) => ({
      ...recipe,
      isLiked: likedRecipeIds.includes(recipe.id),
    }));

    console.log(recipeData);
    res.status(200).json(recipeData);
  } catch (error) {
    console.log(error);
  }
};

// CONTROLLER FOR CLICKING A SPECIFIC RECIPE
export const getRecipeDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`
    );
    const data = response.data;
    data
      ? res.status(200).json(data)
      : res.status(500).json({ error: "no response data" });
  } catch (error) {
    console.log(error);
  }
};
//FETCH LIKED RECIPES

export const fetchLikedRecipe = async (req: Request, res: Response) => {
  const { userId } = req.user
  try {
    const db = getDb();
    const LikedRecipes = await db.collection("likedrecipes").find().toArray();
    console.log(LikedRecipes);
    res.status(200).json(LikedRecipes);
  } catch (error) {
    console.log(error);
  }
};

//LIKING RECIPES
export const addLikedRecipe = async (req: Request, res: Response) => {
  const { id, title, image }: { id: number; title: string; image: string } =
    req.body;
  console.log("Received Data:", { id, title, image });

  try {
    const db = getDb();
    const exists = await db.collection("likedrecipes").findOne({ id });
    if (!exists) {
      const LikedRecipes = await db.collection("likedrecipes").insertOne({
        id,
        title,
        image,
        isLiked: true,
      });
      res.status(200).json(LikedRecipes);
    } else {
      throw Error("Already Liked this Recipe");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const removeLikedRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = getDb();
    const recipeId = parseInt(id);
    const removedRecipe = await db
      .collection("likedrecipes")
      .deleteOne({ id: recipeId });
    res.status(200).json(removedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
