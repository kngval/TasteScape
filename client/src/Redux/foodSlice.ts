import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IRecipes from "../interfaces/IRecipes";
import axios from "axios"
// import { searchMock } from '../mock/searchMock'


interface FoodState {
  recipes: IRecipes[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  recipes: null,
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query: string) => {
    const response = await axios.get(`http://localhost:3000/home/${query}`,{withCredentials:true})

    console.log(response.data)
    const data = response.data;
    return data as IRecipes[];
  
    // console.log(searchMock)
    // return searchMock as IRecipes[]
  }
);

export const fetchTrendingRecipes = createAsyncThunk("recipes/fetchTrendingRecipes", async() => {
  const response = await axios.get(`http://localhost:3000/home`);
  const data = response.data;
  return data ;
})

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    displayRecipes : (state, action) => {
      state.recipes = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true
        state.recipes = null
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});
export const { displayRecipes } = recipeSlice.actions
export default recipeSlice.reducer;
