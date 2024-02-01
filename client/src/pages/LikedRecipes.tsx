import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
import { Recipes } from "../components/Recipes";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import ErrorPopUp from "../components/ErrorPopUp";
const LikedRecipes = () =>{
    const liked = useSelector((state:RootState) => state.likedRecipes.likedRecipes)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchLikedRecipes())
    },[dispatch])



    return(
        <>
            <Navbar />
            <ErrorPopUp />
            <div className="recipes w-full  recipe-container  grid  grid-cols-2 mb-20  md:grid-cols-3  p-2 gap-2 text-xs">
            {liked && liked.map((likedRecipe) => (
                    
                    <Recipes key={likedRecipe.id} id={likedRecipe.id} image={likedRecipe.image} title={likedRecipe.title} isLiked={likedRecipe.isLiked}/>
                    ))}
            </div>
            <BottomNavbar />
        </>
    )
}

export default LikedRecipes;