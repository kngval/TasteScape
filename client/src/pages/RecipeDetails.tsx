//React & Redux
import { RootState, AppDispatch } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchChosenRecipe } from "../Redux/chosenRecipeSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Components

//assets
import stopwatch from "../assets/svgs/RecipeDetails/stopwatch.svg";
import serving from "../assets/svgs/RecipeDetails/serving.svg";
import location from "../assets/svgs/RecipeDetails/location.svg";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import LoadingSpinner from "../components/LoadingSpinner";

const RecipeDetails: React.FC = () => {
  const [tab, setTab] = useState<string>("about");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const chosenRecipe = useSelector(
    (state: RootState) => state.chosenRecipe.chosenRecipe
  );

  const sanitizedHTML = chosenRecipe?.summary;
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

  if (loading || !chosenRecipe?.image) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="RecipeContainer w-full lg:w-[1000px] xl:w-[1200px] lg:mt-10 mb-20 grid  justify-items-center">
          {/* RECIPE IMAGE AND RECIPE DETAILS BAR */}
          <div className="img-wrapper relative xl:rounded-xl w-full">
            <img
              className="w-full h-full object-cover xl:rounded-md"
              src={chosenRecipe?.image}
              alt=""
            />
            <div className="gradient xl:rounded-xl flex justify-center bg-gradient-to-b from-transparent to-black  absolute top-0 bottom-0 w-full h-full z-10">
              <h1 className="z-50 absolute text-2xl text-white bottom-20 font-bold xl:hidden text-center">
                {chosenRecipe?.title}
              </h1>

              <div className="detailsBar text-xxs 2xl:text-lg w-5/6 flex justify-evenly gap-x-5 absolute mx-8  bg-white -bottom-10 rounded-lg  p-4">
                <div className="flex flex-col items-center">
                  <img
                    src={stopwatch}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="">{chosenRecipe?.readyInMinutes} mins</p>
                </div>

                <div className="flex  flex-col items-center">
                  <img
                    src={serving}
                    className="w-10 h-8 object-contain"
                    alt=""
                  />
                  <p className="">{chosenRecipe?.servings} servings</p>
                </div>

                <div className="flex flex-col items-center ">
                  <img
                    src={location}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className=" text-nowrap">{chosenRecipe?.cuisines[0]}</p>
                </div>

                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>

                  <p className="">
                    {chosenRecipe?.healthScore !== undefined
                      ? Math.floor(chosenRecipe?.healthScore)
                      : "N/A"}
                    HS
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="abt-wrapper p-2 flex justify-center items-center mt-[5rem]">
            <button
              className={`${
                tab === "about" ? "bg-customPink text-white" : "bg-gray-200"
              }  text-center  px-3 py-2 rounded-full w-[300px] text-xxs sm:text-sm xl:px-0 mb-10`}
              onClick={() => handleClick("about")}
            >
              About The Dish
            </button>
          </div>

          {/* INGREDIENTS, INSTRUCTIONS, AND NUTRIENTS */}
          <div className="display w-full  sm:px-2 lg:px-10  recipe-container">
            <div className="flex justify-center w-full px-2">
              <div className="btnContainer text-xxs grid grid-cols-3 gap-5  sm:text-sm xl:px-0 mb-10">
                <button
                  className={`${
                    tab === "ingredients"
                      ? "bg-customPink text-white"
                      : "bg-gray-200"
                  } rounded-sm text-center  px-3 py-2`}
                  onClick={() => handleClick("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`${
                    tab === "instructions"
                      ? "bg-customPink text-white"
                      : "bg-gray-200"
                  } rounded-sm  px-3 py-2`}
                  onClick={() => handleClick("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={`${
                    tab === "nutrients"
                      ? "bg-customPink text-white"
                      : "bg-gray-200"
                  } rounded-sm  px-3 py-2`}
                  onClick={() => handleClick("nutrients")}
                >
                  Nutrients
                </button>
              </div>
            </div>

            {/* INGREDIENTS,INSTRUCTIONS & NUTRIENTS DETAILS*/}
            <div className="infoDeta flex flex-col items-center p-2 lg:px-0">
              <div className="text-center mb-10">
                <p className="text-xs xl:text-md uppercase">
                  {tab === "ingredients"
                    ? `ingredients for making`
                    : tab === "instructions"
                    ? "instructions for making"
                    : tab === "nutrients"
                    ? "nutrients of"
                    : "About the Dish"}
                </p>
                <h1 className="headline font-bold xl:text-xl xl:font-extrabold">
                  {chosenRecipe?.title}
                </h1>
              </div>
              <div className="tab-details-container grid w-full gap-2 list-none">
                {tab === "about" && (
                  <fieldset className="w-full p-4 border-2 border-customPink">
                    <legend className="text-sm">About the Dish </legend>
                    <div className="">
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: sanitizedHTML || "",
                        }}
                      ></div>
                    </div>
                  </fieldset>
                )}

                {tab === "ingredients" &&
                  chosenRecipe?.extendedIngredients &&
                  chosenRecipe?.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="px-6 py-2 border-2">
                      {ingredient.original}
                    </li>
                  ))}

                {tab === "instructions" &&
                  chosenRecipe?.analyzedInstructions[0].steps &&
                  chosenRecipe?.analyzedInstructions[0].steps.map(
                    (steps, index) => (
                      <fieldset key={index} className="border-2 p-4 ">
                        <legend className="font-bold xl:text-xl">
                          Step {steps.number}
                        </legend>
                        <li className="mb-3 xl:text-sm 2xl:text-lg">
                          {steps.step}
                        </li>
                      </fieldset>
                    )
                  )}

                {/* NUTRITION TAB */}
                {tab === "nutrients" && (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {chosenRecipe?.nutrition.nutrients &&
                      chosenRecipe?.nutrition.nutrients.map((nutrients) => (
                        <div className="border-2 p-4">
                          <h1>
                            {nutrients.amount} {nutrients.unit} {nutrients.name}
                          </h1>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default RecipeDetails;
