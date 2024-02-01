//REACT & REDUX
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
//Components
import { HomeSlider } from "../components/HomeSlider";
import { Recipes } from "../components/Recipes";
import { BottomNavbar } from "../components/BottomNavbar";
import SideFilter from "../components/SideFilter";
import SearchForm from "../components/SearchForm";
import Navbar from "../components/Navbar";

//assets
import addedRecipe from "../assets/svgs/addedRecipe.svg";
import chef from "../assets/svgs/chef.svg";
// import { ErrorPopUp } from "../components/ErrorPopUp";
const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const successMsg = useSelector(
    (state: RootState) => state.likedRecipes.successMsg
  );
  // const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.likedRecipes.error);
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
