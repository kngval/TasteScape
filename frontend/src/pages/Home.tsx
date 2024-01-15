
//REACT


//Components
import { HomeSlider } from "../components/HomeSlider";
import Navbar from "../components/Navbar";
// import { Recipes } from "../components/Recipes";
import SideFilter from "../components/SideFilter";
import { BottomNavbar } from "../components/BottomNavbar";
//assets
// import chef from "../assets/svgs/chef.svg"

const Home: React.FC = () => {
   
  return (
    <>
      <Navbar />
      <HomeSlider />

      {/* SEARCH BAR */}

      <div className="flex">
        <SideFilter />
      
        </div>
        {/* RECIPES */}

        {/* <div className={`text-center recipe-container flex-grow ${recipes.length === 0 ? 'flex justify-center' : 'grid'} grid-cols-2 mb-20 md:grid-cols-3 p-4 gap-5 text-xs`}>
       {recipes && recipes.length > 0 ? recipes.map((recipe) => (
         <Recipes key={recipe.recipe.id} recipe={recipe.recipe}/>
         )) : (
          <div className="mt-10">
            <img src={chef} className="" alt="" />
            <h1 className="text-gray-300 text-xl">No Recipes</h1>
         </div>
         )
        }
      </div> */}

          <BottomNavbar />
    </>
  );
};

export default Home;
