import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import {
  displaySuccessMsg,
  fetchLikedRecipes,
} from "../Redux/likedRecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

interface CreatedRecipe {
  _id: string;
  title: string;
  image: string;
  isLiked: boolean;
}

const CreatedRecipeComponent: React.FC<CreatedRecipe> = ({
  _id,
  image,
  title,
  isLiked,
}) => {
  const likedRecipes = useSelector(
    (state: RootState) => state.likedRecipes.likedRecipes
  );
  const dispatch = useDispatch<AppDispatch>();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const error = useSelector((state: RootState) => state.likedRecipes.error);

  const handleClick = async () => {
    if (!error) {
      setLiked(true);
      await axios.post(
        "http://localhost:3000/my-recipes",
        {
          _id,
          title,
          image,
          isLiked: true,
        },
        { withCredentials: true }
      );
    }
    if (!error) {
      dispatch(displaySuccessMsg("Recipe added to Favorites"));

      const timeout = setTimeout(() => {
        dispatch(displaySuccessMsg(null));
      }, 2000);

      return () => clearTimeout(timeout);
    }
  };

  const isRecipeLiked =
    likedRecipes && likedRecipes.some((recipe) => recipe.id === recipe.id);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/my-recipes/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(displaySuccessMsg("Recipe removed from Favorites"));
        dispatch(fetchLikedRecipes());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link to={`/my-recipes/${_id} `}>
        <div className="h-[200px]">
          <img
            src={image}
            className="food-img w-full h-full object-cover object-center"
            alt=""
          />
        </div>
      </Link>

      <div className="foodName  flex justify-between items-center px-4 py-3 ">
        <div className="text-start w-3/4">
          <h1 className="">{title}</h1>
        </div>
        <div className="">
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className={` w-4 h-5  ${
              isRecipeLiked || liked
                ? "fill-customPink stroke-0"
                : "fill-none stroke-1"
            } ${location.pathname === "/favorites" ? "hidden" : "block"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>

        <svg
          fill="#FF6F6F"
          width="20px"
          height="30px"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          className={`xl:w-[25px] ${
            location.pathname === "/favorites" ? "block" : "hidden"
          } stroke-black`}
          onClick={() => handleDelete(_id)}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="m1261.963 920.14-120.66 120.66L960.48 859.867l-180.934 180.935-120.66-120.662L839.82 739.205 658.886 558.27l120.66-120.547 180.935 180.935 180.821-180.935 120.661 120.547-180.934 180.935 180.934 180.935ZM1415.377 0H505.586C411.422 0 335 76.536 335 170.586V1920l625.481-375.289L1585.963 1920V170.586C1585.963 76.536 1509.426 0 1415.377 0Z" />{" "}
          </g>
        </svg>
      </div>
    </>
  );
};

export default CreatedRecipeComponent;
