//REACT & REDUX
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../Redux/foodSlice";
//Components
import { Header } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import ErrorPopUp from "../components/ErrorPopUp";
import SearchForm from "../components/SearchForm";
import LoadingSpinner from "../components/LoadingSpinner";
//Libraries
import axios from "axios";
import Recipe from "../interfaces/IRecipes";
const Home: React.FC = () => {
  //REDUX STATES
  const recipes = useSelector((state: RootState) => state?.recipes.recipes);
  const loading = useSelector((state: RootState) => state?.recipes.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [firstMountRecipes, setFirstMountRecipes] = useState<Recipe[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchRecipes("American"));
      fetchRecipes2();
    }
   
  }, [dispatch, userInfo]);

  const fetchRecipes2 = async () => {
    try {
      if (userInfo) {
        const response = await axios.get(`http://localhost:3000/home/asian`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });

        const asianRecipes = response.data.results;
        setFirstMountRecipes(asianRecipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative">
        <Header />
        <SearchForm />
      </div>
      <ErrorPopUp />

      {/* CAROUSEL */}
      <div className="recipe-wrapper mb-40 mt-32 lg:mt-32 px-4 lg:px-12 ">
        <div className="">
          <h1 className="trending  lg:ml-0 ml- text-xl lg:text-2xl mt-10 font-bold">
            American Recipes
          </h1>

          {/* Loader Spinner */}
          <div className="py-4  flex overflow-x-auto w-full scrollbar-style ">
            {loading && !recipes && <LoadingSpinner />}

            {/* RECIPE  */}
            <div className="flex gap-2 ">
              {Array.isArray(recipes) &&
                recipes.length > 0 &&
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
            <h1 className="trending   text-xl lg:text-2xl font-bold">
              Asian Recipes
            </h1>
          </div>

          <div className="py-4  flex overflow-x-auto w-full scrollbar-style">
            {loading && !recipes && <LoadingSpinner />}
            <div className="flex gap-2">
              {Array.isArray(firstMountRecipes) &&
                firstMountRecipes.map((recipe) => (
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
