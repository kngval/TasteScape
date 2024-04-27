import { useSelector } from "react-redux";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { Recipes } from "../components/Recipes";
import SearchForm from "../components/SearchForm";
import { RootState } from "../Redux/store";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPopUp from "../components/ErrorPopUp";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { searchedRecipes, loading } = useSelector(
    (state: RootState) => state.recipes
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  return (
    <>
      <Navbar />

      <ErrorPopUp />
      {/* SEARCH FORM */}
      <div className="w-full h-[100px] relative bg-customPink mb-[5rem]">
        <SearchForm />
      </div>

      {/* LOADING SPINNER */}
      {loading && !searchedRecipes && <LoadingSpinner />}

      {query && (
        <div className="text-center">
          <h1 className="text-gray-500">
            Search Results For {">"} {query}
          </h1>
        </div>
      )}

      {/* SEARCHED RECIPES */}
      {searchedRecipes && searchedRecipes.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {searchedRecipes &&
              searchedRecipes.length > 0 &&
              searchedRecipes.map((recipe, index) => (
                <div className="text-xs md:text-sm xl:text-md  bg-white   border-gray-200 border-2">
                  <Recipes
                    key={index}
                    id={recipe.id}
                    title={recipe.title}
                    isLiked={recipe.isLiked}
                    image={recipe.image}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <BottomNavbar />
    </>
  );
};

export default Search;
