import IRecipes from "../interfaces/IRecipes";
import heart from "../assets/svgs/heart.svg";
import { Link } from "react-router-dom";
import { AppDispatch } from "../Redux/store";
import { useDispatch  } from "react-redux";
import { fetchChosenRecipe } from "../Redux/chosenRecipeSlice";

export const Recipes: React.FC<IRecipes> = ({ image , title, id }) => {
    const dispatch = useDispatch<AppDispatch>()

  const handleClick =(recipeID:number)=>{

      dispatch(fetchChosenRecipe(recipeID)) 
     
  }
  return (
    <>
        <Link to={`/recipe/${id}`} onClick={() => handleClick(id)}>
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
