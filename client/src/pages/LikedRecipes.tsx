import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
import { Recipes } from "../components/Recipes";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import ErrorPopUp from "../components/ErrorPopUp";
import favorites from "../assets/svgs/favorites.svg"
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
      <div className="my-10">
        {liked && liked.length > 0 ? (
          <div>
            <h1 className="text-center text-2xl uppercase">Liked Recipes</h1>
            <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {liked.map((likedRecipe) => (
                <div className="text-xs md:text-sm xl:text-md bg-white  border-gray-200 border-2">
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
          </div>
        ): (
          <div className="flex flex-col items-center text-center p-4">
            <img src={favorites} alt="" className="w-[300px]"/>
            <h1>Your favorite recipes will be displayed here</h1>
          </div>
        )}

        
      </div>
      <BottomNavbar />
    </>
  );
};

export default LikedRecipes;
