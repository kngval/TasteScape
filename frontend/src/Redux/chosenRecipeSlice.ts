import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IRecipes from "../interfaces/IRecipes";

interface ChosenRecipe {
  chosenRecipe: IRecipes | null;
}

const initialState: ChosenRecipe = {
  chosenRecipe: null,
};

const chosenRecipeSlice = createSlice({
  name: "chosenRecipe",
  initialState,
  reducers: {
    setChosenRecipe: (state, action: PayloadAction<IRecipes | null>) => {
      state.chosenRecipe = action.payload;
    },
  },
});

export const { setChosenRecipe } = chosenRecipeSlice.actions;
export default chosenRecipeSlice.reducer;
