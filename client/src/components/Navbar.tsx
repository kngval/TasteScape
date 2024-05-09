import { NavLink, useNavigate } from "react-router-dom";
import NavBtns from "./NavBtns";
import searchIcon from "../assets/svgs/search.svg";
import TasteScape from "../assets/svgs/TasteScape.svg";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { searchRecipes } from "../Redux/foodSlice";
const Navbar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      dispatch(searchRecipes(search));
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <>
      <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white p-2 z-[100]">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center h-full py-3">
            <NavLink to="/home" className="flex items-center justify-center">
              <img src={TasteScape} alt="" className="w-[120px]" />
            </NavLink>
          </div>

          <div className="hidden lg:grid grid-cols-5 ml-[10%] gap-10">
            <NavBtns />
          </div>

          <form
            onSubmit={handleSubmit}
            className="hidden lg:flex w-[15%] h-[70%] items-center"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full h-full bg-white rounded-s-md border-s-2 border-y-2 border-black outline-none p-2"
              placeholder="Search for Recipes..."
            />
            <div className="w-[50px] h-full p-3 flex items-center justify-center  rounded-e-md border-y-2 border-e-2 border-black bg-white">
              <button type="submit" className="">
                <img src={searchIcon} className="w-full h-full" alt="" />
              </button>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
