import IRecipes from "../interfaces/IRecipes";
import heart from "../assets/svgs/heart.svg";
export const Recipes: React.FC<IRecipes> = ({ recipe }) => {
  return (
    <>
      <div className="flex  flex-col justify-center">
        <img
          src={recipe.image}
          className="food-img rounded-lg w-full h-28 sm:h-3/5 object-cover "
          alt=""
        />

        <div className="foodName flex justify-between mt-2 px-2 w-full">
          <h1 className="">{recipe.label}</h1>
          <img src={heart} className="w-3" alt="" />
        </div>
      </div>
    </>
  );
};
