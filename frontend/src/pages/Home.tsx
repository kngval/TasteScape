import { HomeSlider } from "../components/HomeSlider";
import Navbar from "../components/Navbar";


//assets
import searchIcon from "../assets/svgs/search.svg"
import { useState } from "react";


const Home: React.FC = () => {
   const [dropdown, toggleDropdown] = useState(false)
  return (
    <>
      <Navbar />
      <HomeSlider />

      {/* SEARCH BAR */}
      <div className="w-full my-20 flex justify-center items-center">

       
        <input type="text" className="h-8 p-4 rounded-s-full bg-gray-200 " />
        <button className="w-10 flex items-center h-8 p-3 rounded-e-full bg-gray-200">
          <img src={searchIcon} className="" alt="" />
        </button>

      
        <div onClick={() => toggleDropdown(!dropdown)} className="w-32 position: relative filter-container ml-4 p-2 rounded-full text-xs">
        <button className="ml-2" >Filter By : </button>        
        {dropdown && 
        <div className="w-32 position: absolute left-0 top-10 dropdown p-4 rounded-md">
          <ul>
            <li>Filter 1</li>
            <li>Filter 1</li>
            <li>Filter 1</li>
            <li>Filter 1</li>

          </ul>
        </div>
        }
        </div>

        </div>
    </>
  );
};

export default Home;
