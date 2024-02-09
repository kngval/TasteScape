
import { NavLink } from "react-router-dom";
import userSvg  from "../assets/svgs/userIcon.svg";
const Navbar:React.FC = () =>{

    return(
        <>
        <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white p-4 shadow-md z-50">
            <div className="container w-10/12 justify-between flex items-center mx-5">
                <div className="flex items-center">
                <button>
              
            </button>
            <h1 className="navbar-title text-xl font-bold">TasteScape</h1>


            </div>
                <div className="hidden lg:grid grid-cols-3 list-none gap-10">
                    <li><NavLink to='/home'>Home</NavLink></li>
                    <li><NavLink to='/favorites'>Favorites</NavLink></li>
                    <li><NavLink to='/my-recipes'>Create</NavLink></li>
                    
                </div>
            <img className="hidden lg:block w-7" src={userSvg} alt="" />
            </div>
        </nav>
        </>
    )    

}

export default Navbar;