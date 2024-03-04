import { NavLink } from "react-router-dom";
import NavBtns from "./NavBtns";
import searchIcon from "../assets/svgs/search.svg";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white p-4 z-[100]">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center h-full">
            <NavLink to="/home" className="">
              <h1 className="navbar-title text-xl font-">TasteScape</h1>
            </NavLink>
          </div>

          <div className="hidden lg:grid grid-cols-5 ml-[10%] gap-10">
            <NavBtns />
          </div>

          <div className="hidden lg:flex w-[15%] h-[70%] items-center">
            <input
              type="text"
              className="w-full h-full bg-white rounded-s-md border-s-2 border-y-2 border-black outline-none p-2"
              placeholder="Search for Recipes..."
            />
            <div className="w-[50px] h-full p-3 flex items-center justify-center  rounded-e-md border-y-2 border-e-2 border-black bg-white">
            <button
              type="submit"
              className=""
            >
              <img src={searchIcon} className="w-full h-full" alt="" />
            </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
