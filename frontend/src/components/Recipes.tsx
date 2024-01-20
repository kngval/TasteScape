import IRecipes from "../interfaces/IRecipes";
import heart from "../assets/svgs/heart.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { setChosenRecipe } from "../Redux/chosenRecipeSlice";
export const Recipes: React.FC<IRecipes> = ({ recipe }) => {
  const dispatch = useDispatch<AppDispatch>()
  
  const handleClick = (chosenRecipe: IRecipes) =>{
    dispatch(setChosenRecipe({recipe : chosenRecipe.recipe}))
  }

  return (
    <>
       <div className="" >
        <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`} onClick={() => handleClick({recipe})}>
        <img
          src={recipe.image}
          className="food-img rounded-lg w-full h-28 sm:h-3/5 object-cover "
          alt=""
        />
        </Link> 

        <div className="foodName flex justify-between mt-2 px-2 w-full">
          <h1 className="">{recipe.label}</h1>
          <img src={heart} className="w-3" alt="" />
        </div>
      </div>
    </>
  );
};
