import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"
import IRecipes from "../interfaces/IRecipes";

interface LikedRecipes {
    likedRecipes: IRecipes[] | null
    loading : boolean
    error: string | null
    successMsg: string | null
}

const initialState:LikedRecipes = {
    likedRecipes: null,
    loading: true,
    error: null,
    successMsg: null
}
interface ErrorData {
    error: string
}

export const addLikedRecipe = createAsyncThunk('recipe/addLikedRecipe', async({id,image,title,isLiked}:{id:number, image:string, title:string ,isLiked:boolean}) => {
    try{
        const response  = await axios.post("http://localhost:3000/home",{id,image,title,isLiked});
        const data = response.data
        console.log(data);
        return data
    }catch(error){
        const axiosError = error as AxiosError
        const errorData = axiosError.response?.data as ErrorData;
        console.log(errorData.error)
        throw errorData.error
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
        },
        displayError : (state,action) => {
            state.error = action.payload
        },
        displaySuccessMsg: (state,action) => {
            state.successMsg = action.payload 
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
          })
          .addCase(addLikedRecipe.rejected,(state,action) => {
            state.error = action.error.message || null
          })
      },
    
})
export default LikedRecipeSlice.reducer;
export const { displayLikedRecipes, displayError, displaySuccessMsg } = LikedRecipeSlice.actions