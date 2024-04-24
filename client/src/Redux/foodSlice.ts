import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IRecipes from "../interfaces/IRecipes";
import axios from "axios";
// import { searchMock } from '../mock/searchMock'

interface FoodState {
  recipes: IRecipes[] | null;
  searchedRecipes: IRecipes[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  recipes: null,
  searchedRecipes: null,
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query: string) => {
    const response = await axios.get(`http://localhost:3000/home/${query}`, {
      withCredentials: true,
    });

    console.log(response.data.results);
    const data = response.data.results;
    return data as IRecipes[];
  }
);

export const searchRecipes = createAsyncThunk(
  "recipes/searchRecipes",
  async (query: string) => {
    const response = await axios.get(`http://localhost:3000/home/${query}`, {
      withCredentials: true,
    });

    console.log(response.data);
    const data = response.data;
    return data as IRecipes[];
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.recipes = null;
        state.searchedRecipes = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      })
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.searchedRecipes = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedRecipes = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});
export default recipeSlice.reducer;
