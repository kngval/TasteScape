import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CreatedRecipe {
  _id: string;
  title: string;
  image: string;
  isLiked: boolean;
}

interface CreatedRecipeState {
  createdRecipes: CreatedRecipe[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CreatedRecipeState = {
  createdRecipes: null,
  loading: false,
  error: null,
};

export const fetchCreatedRecipes = createAsyncThunk(
  "recipes/fetchCreatedRecipes",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-recipes/");
      const data = response.data;
      return data as CreatedRecipe[];
    } catch (error) {
      console.log(error);
    }
  }
);

const createdRecipeSlice = createSlice({
  name: "createdRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatedRecipes.pending, (state) => {
        state.loading = true;
        state.createdRecipes = null;
      })
      .addCase(fetchCreatedRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.createdRecipes = action.payload ?? null;
      })
      .addCase(fetchCreatedRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});
export default createdRecipeSlice.reducer;
