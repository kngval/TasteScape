import { useState,useEffect, FormEvent } from "react";
// import axios from "axios"
import { MockData } from "../mock/MockData"
import searchIcon from "../assets/svgs/search.svg"

const SearchForm = () => {
    const [dropdown, toggleDropdown] = useState(false)
   const [search, setSearch] = useState('');
   const [query, setQuery] = useState('');

  const getRecipes = async() =>{
    try {
      
      // const response = await axios.get(`http://localhost:3000/Home/${query}`)
      
      const data = MockData

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
    <form onSubmit={handleSearch} className="w-full my-5 flex justify-center items-center text-xs">

       
        <input type="text" value={search} className="w-40 md:w-auto lg:w-1/3 h-8 p-4 rounded-s-full bg-gray-200 outline-none" placeholder="Search for A Recipe..." onChange={(e) => setSearch(e.target.value)}/>
        <button type="submit" className="w-10 flex items-center h-8 p-3 rounded-e-full bg-gray-200">
          <img src={searchIcon} className="" alt="" />
        </button>


      
        <div onClick={() => toggleDropdown(!dropdown)} className="lg:hidden w-20 md:w-1/5 lg:w-2/12 position: relative filter-container ml-4 p-1 rounded-full ">

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
  );
};

export default SearchForm;