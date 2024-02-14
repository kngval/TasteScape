//REACT & REDUX
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
//Components
import { HomeSlider } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import ErrorPopUp from "../components/ErrorPopUp";
//assets
import { PacmanLoader } from "react-spinners";
import { useEffect } from "react";
// import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
import { searchMock } from "../mock/searchMock";
const Home: React.FC = () => {

  //REDUX STATES
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const loading = useSelector((state: RootState) => state?.recipes.loading);
  const dispatch = useDispatch<AppDispatch>();
  const liked = useSelector(
    (state: RootState) => state.likedRecipes.likedRecipes
  );


  // useEffect(() => {
  //   dispatch(fetchLikedRecipes());
  // }, [dispatch]);


  return (
    <>
      <Navbar />
      <HomeSlider />
      <ErrorPopUp />

      {/* Loader Spinner */}
      {loading && !recipes && (
        <div className="w-full my-20 flex justify-center">
          <PacmanLoader color="#FF6F6F" />
        </div>
      )}

      <div className="mb-40 mt-20 lg:mt-32 px-4 lg:mx-auto lg:w-[790px] xl:w-[1200px] 2xl:w-[1400px]">
        <h1 className="trending  lg:ml-0 ml- text-xl lg:text-2xl mt-10 font-bold">
          Trending Recipes
        </h1>
        <div className="py-4  flex overflow-x-auto w-full scrollbar-style" >
          <div className="flex gap-2 ">
            {searchMock &&
              searchMock.map((likedRecipe) => (
                <Recipes
                  key={likedRecipe.id}
                  id={likedRecipe.id}
                  image={likedRecipe.image}
                  title={likedRecipe.title}
                  isLiked={likedRecipe.isLiked}
                />
              ))}
          </div>
        </div>
        
        <div className="mt-10 ">
          {/* <p className="text-xxs ml-5">RECIPES FROM </p> */}
          <h1 className="trending   text-xl lg:text-2xl font-bold">
            Asian Recipes
            </h1>
        </div>

        <div className="py-4  flex overflow-x-auto w-full scrollbar-style">
          <div className="flex gap-2">
            {searchMock &&
              searchMock.map((likedRecipe) => (
                <Recipes
                  key={likedRecipe.id}
                  id={likedRecipe.id}
                  image={likedRecipe.image}
                  title={likedRecipe.title}
                  isLiked={likedRecipe.isLiked}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Recipe Search */}
      {/* <div
        className={`recipes w-full recipe-container  ${
          !recipes ? "hidden" : "grid"
        } grid-cols-2 mb-20  md:grid-cols-3  p-2 gap-3 text-xs`}
      >
      </div> */}

      <BottomNavbar />
    </>
  );
};

export default Home;
