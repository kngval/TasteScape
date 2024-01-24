//React & Redux
import { RootState, AppDispatch } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchChosenRecipe } from "../Redux/chosenRecipeSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//assets
import stopwatch from "../assets/svgs/Recipe Details/stopwatch.svg";
import serving from "../assets/svgs/Recipe Details/serving.svg";
import location from "../assets/svgs/Recipe Details/location.svg";
import calories from "../assets/svgs/Recipe Details/calories.svg";

const RecipeDetails: React.FC = () => {
  const [tab, setTab] = useState<string>("ingredients");

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const chosenRecipe = useSelector(
    (state: RootState) => state.chosenRecipe.chosenRecipe
  );
  const { loading, error } = useSelector(
    (state: RootState) => state.chosenRecipe
  );

  const handleClick = (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenRecipe());
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>LOADING...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
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
                  {chosenRecipe?.cuisines[0]}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img src={calories} className="w-8 h-8 object-contain" alt="" />
                <p className="text-xxs">
                  {chosenRecipe?.healthScore !== undefined
                    ? Math.floor(chosenRecipe?.healthScore)
                    : "N/A"}{" "}
                  HS
                </p>
              </div>
            </div>
          </div>
          <img
            className="w-full h-full object-cover"
            src={chosenRecipe?.image}
            alt=""
          />
        </div>

        {/* INGREDIENTS, INSTRUCTIONS, AND NUTRIENTS */}
        <div className="display">
          <div className="btnContainer flex w-full justify-around text-xs px-4 mb-10">
            <button
              className="rounded-full bg-gray-200 px-4 py-2"
              onClick={() => handleClick("ingredients")}
            >
              Ingredients
            </button>
            <button
              className="rounded-full bg-gray-200 px-4 py-2"
              onClick={() => handleClick("instructions")}
            >
              Instructions
            </button>
            <button
              className="rounded-full bg-gray-200 px-4 py-2"
              onClick={() => handleClick("nutrients")}
            >
              Nutrients
            </button>
          </div>

          
          {/*FIX THE CONDITIONAL STATEMENT BELOW*/}
          <div className={`instructions  p-4 ${tab === "instructions ? "}`}>
            <ol className="list-decimal list-inside">
              {chosenRecipe?.analyzedInstructions.steps.map((steps, index) => (
                <li key={index} className="mb-3">
                  {steps.step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
