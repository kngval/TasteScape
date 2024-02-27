import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
import { Recipes } from "../components/Recipes";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import ErrorPopUp from "../components/ErrorPopUp";
const LikedRecipes = () => {
  const liked = useSelector(
    (state: RootState) => state.likedRecipes.likedRecipes
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchLikedRecipes());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ErrorPopUp />

      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {liked &&
          liked.map((likedRecipe) => (
            <div className="border-gray-200 border-2">
              <Recipes
                key={likedRecipe.id}
                id={likedRecipe.id}
                image={likedRecipe.image}
                title={likedRecipe.title}
                isLiked={likedRecipe.isLiked}
              />
            </div>
          ))}
      </div>
      <BottomNavbar />
    </>
  );
};

export default LikedRecipes;
