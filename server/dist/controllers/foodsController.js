"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLikedRecipe = exports.addLikedRecipe = exports.fetchLikedRecipe = exports.getRecipeDetails = exports.getSearchList = exports.fetchRandomRecipe = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const db_1 = require("../db/db");
//FETCH TRENDING RECIPES
const fetchRandomRecipe = async (req, res) => {
    try {
        const response = await axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`);
        const data = response.data;
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchRandomRecipe = fetchRandomRecipe;
const getSearchList = async (req, res) => {
    const userId = req.user;
    try {
        const db = (0, db_1.getDb)();
        const response = await axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.query}`);
        const apiData = response.data.results;
        // Fetch liked recipes from the database
        const likedRecipeIds = (await db
            .collection("likedrecipes")
            .find({ userId }, { projection: { id: 1 } })
            .toArray()).map((likedRecipe) => likedRecipe.id);
        // Add isLiked property based on whether the recipe is liked
        const recipeData = apiData.map((recipe) => ({
            ...recipe,
            isLiked: likedRecipeIds.includes(recipe.id),
        }));
        console.log(recipeData);
        res.status(200).json(recipeData);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSearchList = getSearchList;
// CONTROLLER FOR CLICKING A SPECIFIC RECIPE
const getRecipeDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios_1.default.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`);
        const data = response.data;
        data
            ? res.status(200).json(data)
            : res.status(500).json({ error: "no response data" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getRecipeDetails = getRecipeDetails;
//FETCH LIKED RECIPES
const fetchLikedRecipe = async (req, res) => {
    const userId = req.user;
    try {
        const db = (0, db_1.getDb)();
        const LikedRecipes = await db
            .collection("likedrecipes")
            .find({ userId })
            .toArray();
        console.log(LikedRecipes);
        res.status(200).json(LikedRecipes);
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchLikedRecipe = fetchLikedRecipe;
//LIKING RECIPES
const addLikedRecipe = async (req, res) => {
    const { id, title, image } = req.body;
    const userId = req.user;
    console.log("Received Data:", { id, title, image, userId });
    try {
        const db = (0, db_1.getDb)();
        const exists = await db.collection("likedrecipes").findOne({ id, userId });
        if (!exists) {
            const LikedRecipes = await db.collection("likedrecipes").insertOne({
                id,
                title,
                image,
                isLiked: true,
                userId,
            });
            res.status(200).json(LikedRecipes);
        }
        else {
            throw Error("Already Liked this Recipe");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
exports.addLikedRecipe = addLikedRecipe;
const removeLikedRecipe = async (req, res) => {
    const userId = req.user;
    try {
        const db = (0, db_1.getDb)();
        const removedRecipe = await db
            .collection("likedrecipes")
            .deleteOne({ userId });
        res.status(200).json(removedRecipe);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.removeLikedRecipe = removeLikedRecipe;
//# sourceMappingURL=foodsController.js.map