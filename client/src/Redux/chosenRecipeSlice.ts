import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodMock } from '../mock/foodMockData'
// import axios from "axios";
export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  cuisines: string[];
  healthScore: number;
  analyzedInstructions: {
    0: {
      steps: {
        number: number;
        step: string;
      }[];
    };
  };
  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
  extendedIngredients: {
    original: string;
  }[];
  summary: string;
}
interface ChosenRecipe {
  chosenRecipe: RecipeDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChosenRecipe = {
  chosenRecipe: null,
  loading: true,
  error: null,
};
export const fetchChosenRecipe = createAsyncThunk(
  "recipe/fetchChosenRecipe",
  async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:3000/home/recipe/${id}`,
      //   {
      //     withCredentials: true,
      //   }
      // );
      // console.log(response.data);
      // const data = response.data;
      // return data as RecipeDetails;

      return FoodMock as RecipeDetails
    } catch (error) {
      console.log(error);
    }
  }
);

const chosenRecipeSlice = createSlice({
  name: "chosenRecipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChosenRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChosenRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.chosenRecipe = action.payload || null;
      })
      .addCase(fetchChosenRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching recipe details";
        console.error("Error fetching recipe details:", action.error);
      });
  },
});

export default chosenRecipeSlice.reducer;
