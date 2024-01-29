import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from './foodSlice'
import chosenRecipeReducer from './chosenRecipeSlice'
import likedRecipeReducer from './likedRecipeSlice';


export const store = configureStore({
    reducer:{
        recipes: recipeReducer,
        chosenRecipe: chosenRecipeReducer,
        likedRecipes: likedRecipeReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable state check
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;
