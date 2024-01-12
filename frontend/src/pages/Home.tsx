
//REACT
import { useState,useEffect, FormEvent } from "react";
// import axios from "axios"
import IRecipes from "../interfaces/IRecipes"

//Components
import { HomeSlider } from "../components/HomeSlider";
import Navbar from "../components/Navbar";
import { Recipes } from "../components/Recipes";
import { MockData } from "../mock/MockData"
//assets
import searchIcon from "../assets/svgs/search.svg"
import { BottomNavbar } from "../components/BottomNavbar";


const Home: React.FC = () => {
   const [dropdown, toggleDropdown] = useState(false)
   const [search, setSearch] = useState('');
   const [query, setQuery] = useState('');
   const [recipes,setRecipes] = useState<IRecipes[]>([]);

  const getRecipes = async() =>{
    try {
      
      // const response = await axios.get(`http://localhost:3000/Home/${query}`)
      
      const data = MockData

      setRecipes(data)
      console.log(data);
    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(() => {
    if(query){
      getRecipes()
    }
  },[query])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(search)
    setSearch('')

  }

  return (
    <>
      <Navbar />
      <HomeSlider />

      {/* SEARCH BAR */}
      <form onSubmit={handleSearch} className="w-full my-5 flex justify-center items-center text-xs">

       
        <input type="text" value={search} className="w-40 md:w-auto lg:w-1/3 h-8 p-4 rounded-s-full bg-gray-200 outline-none" onChange={(e) => setSearch(e.target.value)}/>
        <button type="submit" className="w-10 flex items-center h-8 p-3 rounded-e-full bg-gray-200">
          <img src={searchIcon} className="" alt="" />
        </button>

      
        <div onClick={() => toggleDropdown(!dropdown)} className="w-20 md:w-1/5 lg:w-2/12 position: relative filter-container ml-4 p-1 rounded-full ">

        <button className="ml-2 " >Filter By : </button>        
        {dropdown && 
        <div className="w-full  position: absolute left-0 top-12 dropdown p-4 rounded-md ">
          <ul>
            <li>Filter 1</li>
            <li>Filter 2</li>
            <li>Filter 3</li>
            <li>Filter 4</li>

          </ul>
        </div>
        }
        </div>
        </form>

        {/* RECIPES */}

        <div className="recipe-container flex-grow grid grid-cols-2 mb-20 md:grid-cols-3 p-4 gap-5 text-xs">
       {recipes && recipes.length > 0 ? recipes.map((recipe) => (
        <Recipes key={recipe.recipe.id} recipe={recipe.recipe}/>
       )) : <h1>No recipes</h1>
      }

      {!recipes && <h1>No Recipes</h1>}

      </div>
          <BottomNavbar />
    </>
  );
};

export default Home;
