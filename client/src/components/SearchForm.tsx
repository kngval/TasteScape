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
      className="w-full   absolute  flex justify-center items-center text-xxs sm:text-sm   -bottom-10 z-20"
    >
      <div className="bg-gray-200 border-8 border-[#fcfcfc]   w-3/4  p-3 rounded-sm ">
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            className="w-full h-[50%] bg-white  py-2 px-4 rounded-s-sm  outline-none"
            placeholder="Search for A Recipe..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-10 flex items-center h-[30px]  rounded-e-sm bg-white p-2">
          <button
            type="submit"
            className=""
          >
            <img src={searchIcon} className="w-full h-full" alt="" />
          </button>
          </div>
        </div>
        
      </div>
    </form>
  );
};

export default SearchForm;
