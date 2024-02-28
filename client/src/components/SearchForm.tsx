import { useState, useEffect, FormEvent } from "react";
// import axios from "axios"
import searchIcon from "../assets/svgs/search.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { searchRecipes } from "../Redux/foodSlice";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      navigate('/search')
      dispatch(searchRecipes(query));
    }
  }, [query]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full  absolute  flex justify-center items-center text-xs  -bottom-10 z-20"
    >
      <div className="bg-gray-200 border-8 border-[#fcfcfc]   w-3/4  p-3  rounded-md ">
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            className="w-full bg-white h-10 py-2 px-4 rounded-s-md  outline-none"
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
