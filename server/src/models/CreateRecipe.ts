import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,
  cuisineType: String,
  description: String,
  image: String,
  cookingTime: Number,
  servings: Number,
  healthScore: Number,
  ingredients: [String],
  instructions: [String],
  nutrients: [String],
  createdAt: Date,  
});
const RecipeModel = mongoose.model<Document>("CreatedRecipes", RecipeSchema);
export default RecipeModel;
