import { useSelector } from "react-redux";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { Recipes } from "../components/Recipes";
import SearchForm from "../components/SearchForm";
import { RootState } from "../Redux/store";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPopUp from "../components/ErrorPopUp";
// import { useState } from "react";

const Search = () => {
  const { searchedRecipes, loading } = useSelector(
    (state: RootState) => state.recipes
  );
  // const [queryStr, setQueryStr] = useState('');

  return (
    <>
      <Navbar />

      <ErrorPopUp />
      {/* SEARCH FORM */}
      <div className="w-full h-[100px] relative">
        <SearchForm />
      </div>

      {/* LOADING SPINNER */}
      {loading && !searchedRecipes && <LoadingSpinner />}

      {/* SEARCHED RECIPES */}
      {searchedRecipes && searchedRecipes.length > 0 && (
        <div>
        <div>
          <h1>Search results for</h1>
        </div>
      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-[6rem]">
        {searchedRecipes && searchedRecipes.length > 0 &&
          searchedRecipes.map((recipe) => (
            <div className="text-xs md:text-sm xl:text-md  bg-white   border-gray-200 border-2">
              <Recipes
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
