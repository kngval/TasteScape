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
// import health from "../assets/svgs/RecipeDetails/health.svg";

const RecipeDetails: React.FC = () => {
  const [tab, setTab] = useState<string>("ingredients");
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
      <Navbar />
      <div className="">
        <div className="RecipeContainer xl:mt-10  xl:flex  justify-center  mb-20 xl:mb-0">
          {/* RECIPE IMAGE AND RECIPE DETAILS BAR */}
          <div className="img-wrapper relative xl:sticky xl:top-20  mb-20  xl:mb-0 xl:h-[350px]  xl:w-[500px] 2xl:w-[600px] xl:mr-5 xl:rounded-xl">
            <img
              className="w-full h-full object-cover xl:rounded-md"
              src={chosenRecipe?.image}
              alt=""
            />
            <div className="gradient xl:rounded-xl flex justify-center bg-gradient-to-b from-transparent to-black  absolute top-0 w-full h-full z-10">
              <h1 className="z-50 absolute 2xl:text-2xl  text-white bottom-20 font-bold xl:hidden">
                {chosenRecipe?.title}
              </h1>

              <div className="detailsBar text-xxs 2xl:text-lg w-5/6 flex justify-evenly gap-x-5 absolute mx-8  bg-white -bottom-10 shadow-xl rounded-lg  p-4 ">
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
                      : "N/A"}{" "}
                    HS
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden w-full xl:flex flex-col items-center mb-5">
              <div className="mt-10 recipe-container p-5">
                <h1 className="headline font-extrabold xl:text-[2rem] 2xl:text-[2rem]">
                  {chosenRecipe?.title}
                </h1>
                <div
                  className="text-xs 2xl:text-sm"
                  dangerouslySetInnerHTML={{ __html: sanitizedHTML || "" }}
                ></div>
              </div>
            </div>
          </div>

          {/* INGREDIENTS, INSTRUCTIONS, AND NUTRIENTS */}
          <div className="display  2xl:w-[600px] xl:w-[400px] sm:px-2 lg:px-10 xl:px-0 ml-10 recipe-container">
            <div className="flex justify-center w-full">
              <div className="btnContainer w-full text-xxs grid grid-cols-3 gap-5 lg:gap-0 xl:justify-center  md:text-sm  px-10 xl:px-0 mb-10">
                <button
                  className={`${
                    tab === "ingredients" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full lg:rounded-none text-center  px-3 py-2`}
                  onClick={() => handleClick("ingredients")}
                >
                  Ingredients
                </button>
                <button
                  className={`${
                    tab === "instructions" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full lg:rounded-none  px-3 py-2`}
                  onClick={() => handleClick("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={`${
                    tab === "nutrients" ? "bg-customPink" : "bg-gray-200"
                  } rounded-full lg:rounded-none  px-3 py-2`}
                  onClick={() => handleClick("nutrients")}
                >
                  Nutrients
                </button>
              </div>
            </div>

            {/* INGREDIENTS,INSTRUCTIONS & NUTRIENTS DETAILS*/}
            <div className="infoDeta p-4 lg:px-0">
              <div className="text-center mb-10">
                <p className="text-xs xl:text-md uppercase">{tab} FOR MAKING</p>
                <h1 className="headline font-bold xl:text-xl xl:font-extrabold">
                  {chosenRecipe?.title}
                </h1>
              </div>
              <div className="tab-details-container grid grid-cols-1 gap-5 list-none">
                {tab === "ingredients" &&
                  chosenRecipe?.extendedIngredients &&
                  chosenRecipe?.extendedIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-center shadow-lg py-4 border-l-8 border-customPink"
                    >
                      {ingredient.original}
                    </li>
                  ))}

                {tab === "instructions" &&
                  chosenRecipe?.analyzedInstructions[0].steps &&
                  chosenRecipe?.analyzedInstructions[0].steps.map(
                    (steps, index) => (
                      <div
                        key={index}
                        className="border-l-8  border-customPink p-4  shadow-lg"
                      >
                        <h5 className="font-bold xl:text-xl">
                          Step {steps.number}
                        </h5>
                        <li className="mb-3 xl:text-sm 2xl:text-lg">
                          {steps.step}
                        </li>
                      </div>
                    )
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
