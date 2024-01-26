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
import health from "../assets/svgs/Recipe Details/health.svg"

const RecipeDetails: React.FC = () => {
  const [tab, setTab] = useState<string>("ingredients");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const chosenRecipe = useSelector(
    (state: RootState) => state.chosenRecipe.chosenRecipe
  );
  const sanitizedHTML =chosenRecipe?.summary
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
        <div className="hidden w-full xl:flex flex-col items-center mb-5">
        <div className="xl:w-[1200px] 2xl:w-[1500px] mt-10">
          <h1 className="headline  text-[3rem]">{chosenRecipe?.title}</h1>
        <div className="" dangerouslySetInnerHTML={{ __html: sanitizedHTML || ''}}>
        </div>
        </div>
        </div>
        <div className="RecipeContainer  xl:flex  justify-center  mb-20 xl:mb-32">
          {/* RECIPE IMAGE AND RECIPE DETAILS BAR */}
          <div className="relative mb-20  xl:mb-0 xl:h-[700px]  xl:w-[700px] 2xl:w-[800px] xl:mr-5">
            
            <img
              className="w-full h-full object-cover "
              src={chosenRecipe?.image}
              alt=""
            />
            <div className="gradient  flex justify-center bg-gradient-to-b from-transparent to-black  absolute top-0 w-full h-full z-10">
              <h1 className="z-50 absolute 2xl:text-2xl  text-white bottom-20 font-bold">
                {chosenRecipe?.title}
              </h1>
             
              <div className="detailsBar text-xxs 2xl:text-lg w-5/6 flex justify-evenly gap-x-5 absolute mx-8  bg-white -bottom-10 shadow-xl rounded-lg  p-4 ">
                <div className="flex flex-col items-center">
                  <img
                    src={stopwatch}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="">
                    {chosenRecipe?.readyInMinutes} mins
                  </p>
                </div>

                <div className="flex flex-col items-center">
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
                  <p className=" text-nowrap">
                    {chosenRecipe?.cuisines[0]}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={health}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <p className="">
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
          <div className="display lg:text-lg 2xl:w-[700px] xl:w-[500px] sm:px-2 lg:px-10  ">
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
            <div className="">
              {/* INGREDIENTS */}
              <ul
                className={`${
                  tab === "ingredients" ? "block" : "hidden"
                }  px-8 py-5`}
              >
                <div className="text-center mb-10 xl:text-md">
                  <p className="text-xs sm:text-lg">INGREDIENTS FOR MAKING</p>
                  <h1 className="font-bold sm:text-3xl xl:font-extrabold">
                    {chosenRecipe?.title}
                  </h1>
                </div>

                <div className="flex justify-center xl:h-[500px]">
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
                } list-none px-8 `}
              >
                <div className="text-center mb-10">
                  <p className="text-xs xl:text-lg">INSTRUCTIONS FOR MAKING</p>
                  <h1 className="font-bold xl:text-3xl xl:font-extrabold">
                    {chosenRecipe?.title}
                  </h1>
                </div>
                <div className="xl:h-[500px] overflow-y-auto">
                {chosenRecipe?.analyzedInstructions.steps &&
                  chosenRecipe?.analyzedInstructions.steps.map(
                    (steps, index) => (
                      <div>
                        <h5 className="font-bold 2xl:text-2xl">Step {steps.number}</h5>
                        <li key={index} className="mb-3">
                          {steps.step}
                        </li>
                      </div>
                    )
                  )}
                  </div>
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
