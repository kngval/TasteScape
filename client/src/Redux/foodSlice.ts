import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IRecipes from "../interfaces/IRecipes";
import axios from "axios"
// import { searchMock } from '../mock/searchMock'


interface FoodState {
  recipes: IRecipes[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FoodState = {
  recipes: [],
  status: "idle",
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query:string) => {
    const response = await axios.get(`http://localhost:3000/home/${query}`,{withCredentials:true})

    console.log(response.data)
    const data = response.data;
    return data as IRecipes[];
  
    // console.log(searchMock)
    // return searchMock as IRecipes[]
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});

export default recipeSlice.reducer;
