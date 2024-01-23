import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
//assets
import stopwatch from "../assets/svgs/Recipe Details/stopwatch.svg";
import serving from "../assets/svgs/Recipe Details/serving.svg";
import location from "../assets/svgs/Recipe Details/location.svg";
import calories from "../assets/svgs/Recipe Details/calories.svg";
 
const RecipeDetails:React.FC = () => {
  const chosenRecipe = useSelector(
    (state: RootState) => state.chosenRecipe.chosenRecipe);
    
  return (
    <>
      <div className="RecipeContainer ">
        {/* RECIPE IMAGE AND RECIPE DETAILS BAR */}
        <div className="relative mb-20">
          <div className="gradient flex justify-center bg-gradient-to-b from-transparent to-black  absolute w-full h-full z-10">
            <h1 className="z-50 absolute  text-white bottom-20 font-bold">
              {chosenRecipe?.title}
            </h1>

            <div className="detailsBr flex justify-evenly gap-x-5 absolute mx-8  bg-white -bottom-10 shadow-xl rounded-lg  p-4 ">
              <div className="flex flex-col items-center">
                <img
                  src={stopwatch}
                  className="w-8 h-8 object-contain"
                  alt=""
                />
                <p className="text-xxs">{chosenRecipe?.readyInMinutes} mins</p>
              </div>

              <div className="flex flex-col items-center">
                <img src={serving} className="w-10 h-8 object-contain" alt="" />
                <p className="text-xxs">{chosenRecipe?.servings} servings</p>
              </div>

              <div className="flex flex-col items-center ">
                <img src={location} className="w-8 h-8 object-contain" alt="" />
                <p className="text-xxs text-nowrap">
                  {chosenRecipe?.cuisines}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img src={calories} className="w-8 h-8 object-contain" alt="" />
                <p className="text-xxs">{chosenRecipe?.healthScore} kcal</p>
              </div>
            </div>
          </div>
          <img className="w-full h-full object-cover" src={chosenRecipe?.image} alt="" />
        </div>

        {/* INGREDIENTS, INSTRUCTIONS, AND NUTRIENTS */}
        <div className="ingredients">
          <div className="btnContainer flex w-full justify-around text-xs px-4">
            <button className="rounded-full bg-gray-200 px-4 py-2">
              Ingredients
            </button>
            <button className="rounded-full bg-gray-200 px-4 py-2">
              Instructions
            </button>
            <button className="rounded-full bg-gray-200 px-4 py-2">
              Nutrients
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
