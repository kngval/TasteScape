import { NavLink } from "react-router-dom";
// import userSvg from "../assets/svgs/userIcon.svg";
const Navbar: React.FC = () => {
  return (
    <>
      <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white p-4 shadow-md z-50">
        <div className="w-[95%] justify-between flex items-center mx-5">
          <div className="flex items-center">
            <button></button>
            <NavLink to="/" className="navbar-title text-xl font-semibold ">
              TASTESCAPE
            </NavLink>
          </div>
          <div className="hidden lg:flex list-none gap-10">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Search</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          </div>
          <li className="list-none p-2 bg-[#FF6F6F] text-white hidden  lg:block">
            <NavLink to="/my-recipes">Make Your Own</NavLink>
          </li>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
