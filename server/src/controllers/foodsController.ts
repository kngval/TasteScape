import { Request, Response } from "express";
import axios from "axios";
import LikedModel from "../models/LikedSchema";
import "dotenv/config";

//FOR SEARCHING RECIPES
interface SearchList {
  id: number;
  title: string;
  image: string;
  isLiked: boolean;
}

//FETCH TRENDING RECIPES
export const fetchRandomRecipe = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`
    );
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getSearchList = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`
    );
    const apiData: SearchList[] = response.data.results;

    // Fetch liked recipes from the database
    const likedRecipeIds = (await LikedModel.find({}, { id: 1 })).map(
      (likedRecipe) => likedRecipe.id
    );

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
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//FETCH LIKED RECIPES

export const fetchLikedRecipe = async (req: Request, res: Response) => {
  try {
    const LikedRecipes = await LikedModel.find().sort({ createdAt: -1 });
    res.status(200).json(LikedRecipes);
  } catch (error) {
    console.log(error);
  }
};

//LIKING RECIPES
export const addLikedRecipe = async (req: Request, res: Response) => {
  const { id, title, image }: { id: string; title: string; image: string } =
    req.body;
  console.log("Received Data:", { id, title, image });

  try {
    const exists = await LikedModel.findOne({ id });
    if (!exists) {
      const LikedRecipes = await LikedModel.create({
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
    const recipeId = parseInt(id);
    const removedRecipe = await LikedModel.deleteOne({ id: recipeId });
    res.status(200).json(removedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
