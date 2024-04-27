import { useState, FormEvent } from "react";
// import axios from "axios"
import searchIcon from "../assets/svgs/search.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { searchRecipes } from "../Redux/foodSlice";
import { useNavigate } from "react-router-dom";



const SearchForm: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      dispatch(searchRecipes(search));
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full   absolute  flex justify-center items-center text-xxs sm:text-sm   -bottom-10 z-20"
    >
      <div className="bg-gray-200 border-8 border-[#fcfcfc]   w-3/4  p-2 rounded-sm ">
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            className="w-full  bg-white  py-2 px-4 rounded-s-sm  outline-none"
            placeholder="Search for A Recipe..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-8 lg:w-10 flex items-center   rounded-e-sm bg-white p-2">
            <button type="submit" className="w-full h-full">
              <img src={searchIcon} className="w-full h-full" alt="" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
