import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";

//assets
import stopwatch from "../assets/svgs/Recipe Details/stopwatch.svg";
import serving from "../assets/svgs/Recipe Details/serving.svg";
import location from "../assets/svgs/Recipe Details/location.svg";
import calories from "../assets/svgs/Recipe Details/calories.svg";


const RecipeDetails: React.FC = () => {
  const chosenRecipe = useSelector(
    (state: RootState) => state.chosenRecipe.chosenRecipe?.recipe
  );
  return (
    <div className="relative">
      <div className="gradient flex justify-center bg-gradient-to-b from-transparent to-black  absolute w-full h-full z-10">
        <h1 className="z-50 absolute  text-white bottom-20 font-bold">
          {chosenRecipe?.label}
        </h1>

        <div className="detailsBr grid grid-cols-4 gap-x-5 absolute mx-8  bg-white -bottom-10 shadow-xl rounded-lg  p-4 ">
          
          <div className="flex flex-col items-center">
            <img src={stopwatch} className="w-8 h-8 object-contain" alt="" />
            <p className="text-xxs">{chosenRecipe?.totalTime} mins</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={serving} className="w-10 h-8 object-contain" alt="" />
            <p className="text-xxs">{chosenRecipe?.yield} servings</p>
          </div>
        
          <div className="flex flex-col items-center">
            <img src={location} className="w-8 h-8 object-contain" alt="" />
            <p className="text-xxs text-nowrap">{chosenRecipe?.cuisineType}</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={calories} className="w-8 h-8 object-contain" alt="" />
            <p className="text-xxs">{chosenRecipe?.calories} kcal</p>
          </div>
        </div>
      </div>
      <img className="w-full" src={chosenRecipe?.image} alt="" />
    </div>
  );
};

export default RecipeDetails;
