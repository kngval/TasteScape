//REACT & REDUX
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//Components
import { Header } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import ErrorPopUp from "../components/ErrorPopUp";
//assets
import { PacmanLoader } from "react-spinners";

//Exported Functions
import { fetchRecipes } from "../Redux/foodSlice";
import SearchForm from "../components/SearchForm";
import LoadingSpinner from "../components/LoadingSpinner";
const Home: React.FC = () => {
  //REDUX STATES
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const loading = useSelector((state: RootState) => state?.recipes.loading);
  const dispatch = useDispatch<AppDispatch>();
  // const liked = useSelector(
  //   (state: RootState) => state.likedRecipes.likedRecipes
  // );

  useEffect(() => {
    dispatch(fetchRecipes("Korean"));
  }, [dispatch]);
  
  return (
    <>
      <Navbar />

      <div className="relative">
      <Header />
      <SearchForm />
      </div>
      <ErrorPopUp />
      
      {/* Loader Spinner */}

      <div className="mb-40 mt-0 lg:mt-32 px-4 lg:px-12 ">
        <h1 className="trending  lg:ml-0 ml- text-xl lg:text-2xl mt-10 font-bold">
          Trending Recipes
        </h1>

        {/* CAROUSEL */}
        <div className="py-4  flex overflow-x-auto w-full scrollbar-style" >
            {loading && !recipes && (
              <LoadingSpinner />
            )}

            {/* RECIPE  */}
          <div className="flex gap-2 ">
            {recipes &&
              recipes.map((recipe) => (
                <div className="text-xs md:text-sm xl:text-md  bg-white w-[200px] sm:w-[300px] lg:w-[300px] border-gray-200 border-2">
                  <Recipes
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    isLiked={recipe.isLiked}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10 ">
          {/* <p className="text-xxs ml-5">RECIPES FROM </p> */}
          <h1 className="trending   text-xl lg:text-2xl font-bold">
            Asian Recipes
          </h1>
        </div>

        <div className="py-4  flex overflow-x-auto w-full scrollbar-style" >
            {loading && !recipes && (
              <LoadingSpinner />
            )}
          <div className="flex gap-2">
            {recipes &&
              recipes.map((recipe) => (
                <div className="text-xs md:text-sm xl:text-md  bg-white w-[200px] sm:w-[300px] lg:w-[300px] border-gray-200 border-2">
                  <Recipes
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    isLiked={recipe.isLiked}
                  />
                </div>
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
