import IRecipes from "../interfaces/IRecipes";
import heart from "../assets/svgs/heart.svg";
import { Link } from "react-router-dom";
import { AppDispatch } from "../Redux/store";
import { addLikedRecipe } from "../Redux/likedRecipeSlice";
import { useDispatch } from "react-redux";

export const Recipes: React.FC<IRecipes> = ({ image , title, id }) => {
    const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    dispatch(addLikedRecipe({
      image,
      title,
      id
    }))
  }

  return (
    <>
      <div className="md:text-lg">
        <Link to={`/recipe/${id}`}>
       <div className="" >
        <img
          src={image}
          className="food-img rounded-lg w-full h-32 sm:h-48 lg:h-32 xl:h-52 2xl:h-64 object-cover "
          alt=""
        /> 
      </div>
        </Link>

        <div className="foodName flex justify-between mt-2 px-2 w-full">
          <div className="w-10/12 text-start">
          <h1 className="">{title}</h1>
          </div>
          <img src={heart} className="w-3 md:w-5" alt="" onClick={() => handleClick()}/>
        </div>
        </div>
    </>
  );
};
