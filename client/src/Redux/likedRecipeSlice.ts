import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import IRecipes from "../interfaces/IRecipes";

interface LikedRecipes {
    likedRecipes: IRecipes[] | null
    loading : boolean
    error: string | null
}

const initialState:LikedRecipes = {
    likedRecipes: null,
    loading: true,
    error: null
}

export const addLikedRecipe = createAsyncThunk('recipe/addLikedRecipe', async({id,image,title}:{id:number, image:string, title:string},thunkAPI) => {
    try{
        const response  = await axios.post("http://localhost:3000/home",{id,image,title});
        console.log(response.data);
        
        return response
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }

})

export const fetchLikedRecipes = createAsyncThunk('recipe/fetchLikedRecipe',async() => {
    try{
        const response = await axios.get(`http://localhost:3000/liked-recipes`)

        const data = response.data
        console.log(data);
        return data as IRecipes[]

    } catch(error){

    }
})

export const deleteLikedRecipe = createAsyncThunk('recipe/deleteLikedRecipe', async(id:number) => {
    try{
        const response = await axios.delete(`http://localhost:3000/liked-recipes/${id}`)
        console.log(response.data)

    }catch(error){

    }
})
const LikedRecipeSlice = createSlice({
    name: "likedRecipes",
    initialState,
    reducers:{
        displayLikedRecipes: (state,action:PayloadAction<IRecipes[]>) => {
            state.likedRecipes = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchLikedRecipes.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchLikedRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.likedRecipes = action.payload || null;
          })
          .addCase(fetchLikedRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "An error occurred.";
          });
      },
    
})
export default LikedRecipeSlice.reducer;
export const { displayLikedRecipes } = LikedRecipeSlice.actions