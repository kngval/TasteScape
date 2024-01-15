import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MockData } from "../../mock/MockData";

interface FoodItem {
  id: number;
  label: string;
  image: string;
  ingredients: string[];
}

interface FoodState {
  data: FoodItem[];
  loading: boolean;
  error: null | string | {};
}

const initialState: FoodState = {
  data: [],
  loading: false,
  error: null,
};

//ASYNC FETCH DATA

const fetchFoodData = createAsyncThunk("food/fetchFood", async () => {
  try {
    const foodData: FoodItem[] = MockData.map((item) => ({
      id: item.recipe.id,
      label: item.recipe.label,
      image: item.recipe.image,
      ingredients: item.recipe.ingredientLines,
    }));
    return foodData;
  } catch (error) {
    console.error("Error fetching food:", error);
    throw error;
  }
});

const foodSlice = createSlice({
  name: "Food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFoodData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occured while fetching data";
      });
  },
});

export default foodSlice.reducer;
