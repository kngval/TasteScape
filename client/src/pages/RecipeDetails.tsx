//React & Redux
import { RootState, AppDispatch } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchChosenRecipe } from "../Redux/chosenRecipeSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";

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
      dispatch(fetchChosenRecipe(id));
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
      <Navbar />
      <div className="xl:flex items-center justify-center h-screen w-full xl:px-5">
        <div className="RecipeContainer xl:flex mb-20">
          {/* RECIPE IMAGE AND RECIPE DETAILS BAR */}
          <div className="relative mb-20 xl:max-w-2xl xl:mr-10">
            
            <img
              className="w-full h-full object-cover"
              src={chosenRecipe?.image}
              alt=""
            />
            <div className="gradient flex justify-center bg-gradient-to-b from-transparent to-black  absolute top-0 w-full h-full z-10">
              <h1 className="z-50 absolute  text-white bottom-20 font-bold">
                {chosenRecipe?.title}
              </h1>
             
              <div className="detailsBar w-5/6 flex justify-evenly gap-x-5 absolute mx-8  bg-white -bottom-10 shadow-xl rounded-lg  p-4 ">
                <div className="flex flex-col items-center">
                  <img
                    src={stopwatch}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="text-xxs">
                    {chosenRecipe?.readyInMinutes} mins
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={serving}
                    className="w-10 h-8 object-contain"
                    alt=""
                  />
                  <p className="text-xxs">{chosenRecipe?.servings} servings</p>
                </div>

                <div className="flex flex-col items-center ">
                  <img
                    src={location}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="text-xxs text-nowrap">
                    {chosenRecipe?.cuisines[0]}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={calories}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="text-xxs">
                    {chosenRecipe?.healthScore !== undefined
                      ? Math.floor(chosenRecipe?.healthScore)
                      : "N/A"}{" "}
                    HS
                  </p>
                </div>
              </div>
            </div>
            
          </div>

          {/* INGREDIENTS, INSTRUCTIONS, AND NUTRIENTS */}
          <div className="display lg:text-lg">
            <div className="flex justify-center w-full">
              <div className="btnContainer w-full text-xxs grid grid-cols-3 gap-5 xl:gap-0 xl:justify-center  md:text-sm  px-10 xl:px-0 mb-10">
                <button
                  className={`${
                    tab === "ingredients" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full xl:rounded-none text-center  px-3 py-2`}
                  onClick={() => handleClick("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`${
                    tab === "instructions" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full xl:rounded-none  px-3 py-2`}
                  onClick={() => handleClick("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={`${
                    tab === "nutrients" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full xl:rounded-none  px-3 py-2`}
                  onClick={() => handleClick("nutrients")}
                >
                  Nutrients
                </button>
              </div>
            </div>
            <div className="xl:max-w-3xl">
              {/* INGREDIENTS */}
              <ul
                className={`${
                  tab === "ingredients" ? "block" : "hidden"
                }  px-8 py-5`}
              >
                <div className="text-center mb-10 xl:text-md">
                  <p className="text-xs xl:text-lg">INGREDIENTS FOR MAKING</p>
                  <h1 className="font-bold xl:text-3xl xl:font-extrabold">
                    {chosenRecipe?.title}
                  </h1>
                </div>

                <div className="flex justify-center">
                  <div>
                    {chosenRecipe?.extendedIngredients &&
                      chosenRecipe?.extendedIngredients.map((ingredient) => (
                        <li className="list-disc md:text-xl">{ingredient.original}</li>
                      ))}
                  </div>
                </div>
              </ul>
              {/* INGREDIENTS ENDS HERE */}

              {/* INSTRUCTIONS */}
              <div
                className={`${
                  tab === "instructions" ? "block" : "hidden"
                } list-none px-8`}
              >
                <div className="text-center mb-10">
                  <p className="text-xs xl:text-lg">INSTRUCTIONS FOR MAKING</p>
                  <h1 className="font-bold xl:text-3xl xl:font-extrabold">
                    {chosenRecipe?.title}
                  </h1>
                </div>
                {chosenRecipe?.analyzedInstructions.steps &&
                  chosenRecipe?.analyzedInstructions.steps.map(
                    (steps, index) => (
                      <div>
                        <h5 className="font-bold">Step {steps.number}</h5>
                        <li key={index} className="mb-3">
                          {steps.step}
                        </li>
                      </div>
                    )
                  )}
              </div>
              {/* INSTRUCTIONS ENDS HERE*/}
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default RecipeDetails;
