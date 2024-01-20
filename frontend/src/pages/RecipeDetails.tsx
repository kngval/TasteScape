
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";

const RecipeDetails:React.FC = () => {
    const chosenRecipe = useSelector((state:RootState) => state.chosenRecipe.chosenRecipe?.recipe)    
  return (
    <div>
        <h1>{chosenRecipe?.label}</h1>
        <img src={chosenRecipe?.image} alt="" />
    </div>
  );
};

export default RecipeDetails;