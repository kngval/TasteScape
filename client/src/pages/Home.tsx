//REACT & REDUX
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
//Components
import { HomeSlider } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { BottomNavbar } from "../components/BottomNavbar";
import SideFilter from "../components/SideFilter";
import Navbar from "../components/Navbar";
import ErrorPopUp from "../components/ErrorPopUp";
//assets
import chef from "../assets/svgs/chef.svg";
import { PacmanLoader } from "react-spinners";


const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const loading = useSelector((state:RootState) => state?.recipes.loading);

  

  return (
    <>
      <Navbar />
      <HomeSlider />
      <ErrorPopUp />
      <div className="flex lg:px-20">
        <SideFilter />
        <div className="w-full flex flex-col items-center">
          {/* SEARCH BAR */}
      
          <div
            className={`recipes w-full text-center recipe-container  ${
              !recipes ? "flex justify-center" : "grid"
            } grid-cols-2 mb-20  md:grid-cols-3  p-2 gap-3 text-xs`}
          >
            {/* RECIPES */}
            {loading && !recipes && (
              <div className="w-full my-20 flex justify-center">
                <PacmanLoader color="#FF6F6F"/>
              </div>
            )}
          

            {recipes && !loading &&
              recipes.map((recipe) => (
                <Recipes
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  isLiked={recipe.isLiked}
                />
              ))}

            {!recipes && !loading && (
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
              )}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
