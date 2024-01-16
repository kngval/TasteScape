import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from './foodSlice'
export const store = configureStore({
    reducer:{
        recipes: recipeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;
