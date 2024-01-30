import { useDispatch, useSelector } from "react-redux";
import { BottomNavbar } from "../components/BottomNavbar";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { displayLikedRecipes, fetchLikedRecipes } from "../Redux/likedRecipeSlice";
import { Recipes } from "../components/Recipes";
const LikedRecipes = () =>{
    const liked = useSelector((state:RootState) => state.likedRecipes.likedRecipes)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchLikedRecipes())
    },[dispatch,liked])

    return(
        <>
            LIKED RECIPES
            {liked && liked.map((likedRecipe) => (
                <div>
                    <Recipes id={likedRecipe.id} image={likedRecipe.image} title={likedRecipe.title}/>
                </div>
            ))}

            <BottomNavbar />
        </>
    )
}

export default LikedRecipes;