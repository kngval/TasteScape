import { NavLink } from "react-router-dom";
import NavBtns from "./NavBtns";
import searchIcon from "../assets/svgs/search.svg";

// import userSvg from "../assets/svgs/userIcon.svg";
const Navbar: React.FC = () => {
  return (
    <>
      <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white px-4 py-2 z-[100]">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center h-full">
            <NavLink to="/home" className="navbar-title text-xl font-semibold ">
              TASTESCAPE
            </NavLink>
          </div>

          <div className="hidden lg:flex ml-[8%] gap-2">
            <NavBtns />
          </div>

          <div className="hidden lg:flex w-[20%] h-[70%] items-center">
            <input
              type="text"
              className="w-full h-full bg-white rounded-s-md border-s-2 border-y-2 border-black outline-none p-2"
              placeholder="Search for Recipes..."
            />
            <button
              type="submit"
              className="w-[50px] h-[40px] p-2 flex items-center justify-center  rounded-e-md border-y-2 border-e-2 border-black bg-white"
            >
              <img src={searchIcon} className="w-full h-full" alt="" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
