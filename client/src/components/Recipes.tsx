import IRecipes from "../interfaces/IRecipes";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import { addLikedRecipe } from "../Redux/likedRecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const Recipes: React.FC<IRecipes> = ({ image, title, id, isLiked }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const error = useSelector((state:RootState) => state.likedRecipes.error);

  const handleClick = async() => {
    if(!error)
    {
      setLiked(!liked)
      
    }
    
    setLiked(true)
    await dispatch(
      addLikedRecipe({
        image,
        title,
        id,
        isLiked
      })
    );
  };

  return (
    <>
      <div className="md:text-md xl:text-lg  p-4 shadow-md  rounded-lg">
        <Link to={`/recipe/${id} `}>
          <div className="">
            <img
              src={image}
              className="food-img  w-full h-[120px] sm:h-48 lg:h-32 xl:h-42 2xl:h-60 object-cover"
              alt=""
            />
          </div>
        </Link>

        <div className="foodName flex justify-between items-center mt-2 ">
          <div className="text-start">
            <h1 className="">{title}</h1>
          </div>
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className={`ml-2 w-5 h-5  ${
              liked === true ? "fill-customPink stroke-0" : "fill-none stroke-1"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
