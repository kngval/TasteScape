import { useState, useEffect, FormEvent } from "react";
// import axios from "axios"
import searchIcon from "../assets/svgs/search.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { fetchRecipes } from "../Redux/foodSlice";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipes(query));
    }
  }, [query]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full  absolute  flex justify-center items-center text-xs  -bottom-10 z-20"
    >
      <div className="bg-gray-200 border-8 border-white  flex flex-col w-3/4 justify-center p-3 rounded-md text-center">
        {/* <h1 className="text-lg font-semibold">Whatchu Lookin' For?</h1> */}
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            className="w-3/4 bg-white h-10 p-4 rounded-s-md  outline-none"
            placeholder="Search for A Recipe..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="w-10 flex items-center h-10 p-3 rounded-e-md bg-white"
          >
            <img src={searchIcon} className="" alt="" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
