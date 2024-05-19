"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCreatedRecipe =
  exports.getCreatedRecipeDetails =
  exports.fetchCreatedRecipeDetails =
  exports.createRecipe =
  exports.fetchCreatedRecipes =
    void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
// FETCHING ALL RECIPES (GET REQUEST)
const fetchCreatedRecipes = async (req, res) => {
  const userId = req.user;
  try {
    const db = (0, db_1.getDb)();
    const response = await db
      .collection("createdrecipes")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    console.log(response);
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "No Recipes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.fetchCreatedRecipes = fetchCreatedRecipes;
// CREATING RECIPE (POST REQUEST)
const createRecipe = async (req, res) => {
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
  } = req.body;
  const userId = req.user;
  console.log(userId);
  try {
    const db = (0, db_1.getDb)();
    const imgResponse = await cloudinary_1.default.uploader.upload(image, {
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
      userId,
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
exports.createRecipe = createRecipe;
//CREATED RECIPES DETAILS
const fetchCreatedRecipeDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const db = (0, db_1.getDb)();
    const ClickedRecipe = await db
      .collection("createdrecipes")
      .find({ _id: new mongodb_1.ObjectId(id) })
      .toArray();
    console.log(ClickedRecipe);
    ClickedRecipe
      ? res.status(200).json(ClickedRecipe)
      : res.status(500).json({ error: "Failed to fetch Created Recipe" });
  } catch (error) {
    console.log(error);
  }
};
exports.fetchCreatedRecipeDetails = fetchCreatedRecipeDetails;
const getCreatedRecipeDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const db = (0, db_1.getDb)();
    const response = await db
      .collection("createdrecipes")
      .findOne({ _id: new mongodb_1.ObjectId(id) });
    console.log(response);
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "Nothing found in db..." });
  } catch (error) {
    console.log(error);
  }
};
exports.getCreatedRecipeDetails = getCreatedRecipeDetails;
//DELETE CREATED RECIPE
const deleteCreatedRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  try {
    const db = (0, db_1.getDb)();
    const response = await db
      .collection("createdrecipes") // Target the "likedrecipes" collection
      .deleteOne({ _id: new mongodb_1.ObjectId(id), userId });
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
exports.deleteCreatedRecipe = deleteCreatedRecipe;
//# sourceMappingURL=CreatingRecipes.js.map
