import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import chef3 from "../assets/svgs/MyRecipes/chef3.svg";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="mt-[4rem] mb-[5rem] lg:mt-[10rem]">
        <div className="w-full flex justify-center ">
          <div className="bg-customPink p-2 text-sm lg:text-lg text-white rounded-sm cursor-pointer" onClick={() => navigate('/my-recipes/createRecipe')}>
            <h1>Click here to Create your own Recipe</h1>
          </div>
        </div>

        <div className="w-full h-[300px] flex justify-center mt-10">
          <img src={chef3} className="w-full h-full" alt="" />
        </div>
        <div className="w-full flex justify-center text-sm lg:text-lg  mt-5">
          <h1 className="p-4 w-[90%] text-center">
            Empower your kitchen; innovate, taste, and craft your own culinary
            Legacy
          </h1>
        </div>
      </div>

     
      <BottomNavbar />
    </>
  );
};

export default MyRecipes;
