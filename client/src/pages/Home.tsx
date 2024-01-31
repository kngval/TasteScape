//REACT & REDUX
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { displayRecipes } from "../Redux/foodSlice";
//Components
import { HomeSlider } from "../components/HomeSlider";
import SideFilter from "../components/SideFilter";
import { Recipes } from "../components/Recipes";
import SearchForm from "../components/SearchForm";

//assets
// import recipeImg from "../assets/svgs/recipe.svg";
import { displayError, displaySuccessMsg } from "../Redux/likedRecipeSlice";
import addedRecipe from "../assets/svgs/addedRecipe.svg";
import chef from "../assets/svgs/chef.svg"
const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const success = useSelector((state:RootState) => state.likedRecipes.successMsg)
  // const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.likedRecipes.error);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    
    if (error) {
      setShowError(true);

      const timeout = setTimeout(() => {
        setShowError(false);
        dispatch(displayError(null));
      }, 2000);
      return () => clearTimeout(timeout);
    }
    if(success){
      dispatch(displaySuccessMsg('Recipe Added to Favorites'))
      const timeout = setTimeout(() => {
        dispatch(displaySuccessMsg(null))
      }, 2000)
      return () => clearTimeout(timeout);
    }

  }, [dispatch,error]);

  return (
    <>
      <HomeSlider />
      <div
        className={`${
          success ? "fixed" : "hidden"
        } flex justify-center items-center top-20 z-20 w-full h-20`}
      >
        <div className="flex items-center justify-center bg-gray-100 rounded-lg w-[250px] p-4 text-xs xl:text-lg xl:w-[400px]">
          <img src={addedRecipe} className="h-10" alt="" />
          <h1 className="ml-5 text-center ">{success}</h1>
        </div>
      </div>
      <div
        className={`${
          showError ? "fixed" : "hidden"
        } flex justify-center items-center top-20 z-20 w-full h-20`}
      >
        <div className="flex items-center justify-center bg-gray-100 rounded-lg w-[250px] p-4 text-xs xl:text-lg xl:w-[400px]">
          <img src={addedRecipe} className="h-10" alt="" />
          <h1 className="ml-5 text-center ">{showError && error}</h1>
        </div>
      </div>
      <div className="flex lg:px-20">
        <SideFilter />
        <div className="w-full flex flex-col items-center">
          {/* SEARCH BAR */}
          <SearchForm />
          <div
            className={`recipes w-full text-center recipe-container  ${
              recipes.length === 0 ? "flex justify-center" : "grid"
            } grid-cols-2 mb-20  md:grid-cols-3  p-2 gap-3 text-xs`}
          >
            {/* RECIPES */}
            {recipes &&
              recipes.length !== 0 &&
              recipes.map((recipe) => (
                <Recipes
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  isLiked={recipe.isLiked}
                />
              ))}
            {!recipes ||
              (recipes.length === 0 && (
                <div className="w-full flex flex-col items-center">
                  <img className="my-5 w-28
                  " src={chef} alt="" />
                  <p className="w-10/12 uppercase text-xxs sm:text-xs">Discover Vast Recipes from Around the World <span className="block">with</span></p>
                  
                  <h1 className="text-lg font-bold">TASTESCAPE</h1>
                  

                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
