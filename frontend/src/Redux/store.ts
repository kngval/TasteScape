import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from './foodSlice'
import chosenRecipeReducer from './chosenRecipeSlice'
export const store = configureStore({
    reducer:{
        recipes: recipeReducer,
        chosenRecipe: chosenRecipeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;
