//REACT & REDUX
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
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
import chef from "../assets/svgs/chef.svg";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const successMsg = useSelector(
    (state: RootState) => state.likedRecipes.successMsg
  );
  // const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.likedRecipes.error);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick =()=>{
    dispatch(displayError(null))
    dispatch(displaySuccessMsg(null))
  }
  return (
    <>
      <Navbar />
      <HomeSlider />
      <div
        className={`${
          successMsg && !error ? "fixed" : "hidden"
        } flex justify-center items-center top-20 z-20 w-full h-20`}
      >
        <div className="flex items-center justify-center bg-gray-100 rounded-lg w-[250px] p-4 text-xs xl:text-lg xl:w-[400px]">
          <img src={addedRecipe} className="h-10" alt="" />
          <h1 className="ml-5 text-center ">{successMsg}</h1>
        </div>
      </div>
      <div
        className={`${
          error ? "fixed" : "hidden"
        } flex justify-center items-center top-20 lg:top-24 z-20 w-full h-20`}
      >
        <div className="p-4 bg-gray-100 rounded-lg w-[250px]  text-xs xl:text-lg  lg:w-[400px]">
          <h1 className="text-xs font-semibold lg:text-sm">{error}</h1>
          <h3 className="text-xxs lg:text-xs">Do you want to remove it?</h3>
          <div className="w-full text-end text-xxs mt-3 lg:text-sm">
            <button className="px-4 py-1 bg-customPink shadow-lg rounded-sm  ">Yes</button>
            <button className="px-4 py-1 border-1 border-gray-100  shadow-lg  ml-2 " onClick={handleClick}>No</button>
          </div>
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
                  <img
                    className="my-5 w-28
                  "
                    src={chef}
                    alt=""
                  />
                  <p className="w-10/12 uppercase text-xxs sm:text-xs">
                    Discover Vast Recipes from Around the World{" "}
                    <span className="block">with</span>
                  </p>

                  <h1 className="text-lg font-bold">TASTESCAPE</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
