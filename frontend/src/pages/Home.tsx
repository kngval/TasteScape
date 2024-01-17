//REACT & REDUX
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";

//Components
import { HomeSlider } from "../components/HomeSlider";
import Navbar from "../components/Navbar";
import SideFilter from "../components/SideFilter";
import { BottomNavbar } from "../components/BottomNavbar";
import { Recipes } from "../components/Recipes";
import SearchForm from "../components/SearchForm";

//assets
import recipe from "../assets/svgs/recipe.svg";
const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  return (
    <>
      <Navbar />
      <HomeSlider />
      {/* SEARCH BAR */}
      <div className="flex lg:px-20">
        <SideFilter />

        {/* RECIPES */}
        <div className="w-full flex flex-col items-center">
          <SearchForm />
          <div
            className={`recipes  text-center recipe-container  ${
              recipes.length === 0 ? "flex justify-center" : "grid"
            } grid-cols-2 mb-20  md:grid-cols-3 p-5 gap-5 text-xs `}
          >
            {recipes &&
              recipes.length !== 0 &&
              recipes.map((recipe, index) => (
                <Recipes key={index} recipe={recipe.recipe} />
              ))}
            {!recipes ||
              (recipes.length === 0 && (
                <div className="text-gray-400 flex flex-col">
                  <img src={recipe} alt="" />
                  <h1>Discover Recipes</h1>
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
