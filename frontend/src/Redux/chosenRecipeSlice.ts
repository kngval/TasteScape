import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export interface RecipeDetails {
  id: number,
  title: string,
  image: string,
  servings: number,
  readyInMinutes: number;
  cuisines: string[] | "N/A";
  healthScore: number,
  instructions: string,
  extendedIngredients: [
    {
      original: string;
    }
  ];

}

interface ChosenRecipe {
  chosenRecipe: RecipeDetails | null;
}

const initialState: ChosenRecipe = {
  chosenRecipe: null,
};
export const fetchChosenRecipe = createAsyncThunk('recipe/fetchChosenRecipe', async(id:number) => {
  try{
    const response  = await axios.get(`http://localhost:3000/home/recipe/${id}`,{withCredentials:true})
    console.log(response.data)
    const data = response.data;
    return data  as RecipeDetails;
  } catch (error){
    console.log(error)
  }
})


const chosenRecipeSlice = createSlice({
  name: "chosenRecipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChosenRecipe.fulfilled, (state, action) => {
      if (action.payload) {
        state.chosenRecipe = action.payload;
      }
    });
  },
});
export default chosenRecipeSlice.reducer;
