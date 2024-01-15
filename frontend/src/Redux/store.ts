import { configureStore } from "@reduxjs/toolkit";
import foodReducer from './FoodSlice/foodSlice'
export const store = configureStore({
    reducer:{
        foodFetch:foodReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;
