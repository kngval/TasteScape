import IRecipes from "../interfaces/IRecipes";
import heart from "../assets/svgs/heart.svg";
import { Link } from "react-router-dom";


export const Recipes: React.FC<IRecipes> = ({ image , title, id }) => {
  
  return (
    <>
        <Link to={`/recipe/${id}`}>
       <div className="" >
        <img
          src={image}
          className="food-img rounded-lg w-full h-28 sm:h-3/5 object-cover "
          alt=""
        /> 

        <div className="foodName flex justify-between mt-2 px-2 w-full">
          <h1 className="">{title}</h1>
          <img src={heart} className="w-3" alt="" />
        </div>
      </div>
        </Link>
    </>
  );
};
