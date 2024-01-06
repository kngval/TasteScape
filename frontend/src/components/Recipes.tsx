import IRecipes from "../interfaces/IRecipes"

export const Recipes:React.FC<IRecipes> = ({recipe}) =>{


    return(
        <>
            <div>
            <h1>{recipe.label}</h1>

            <img src={recipe.image} alt="" />
            <p>{recipe.ingredientLines}</p>
            </div>
        </>


    )
}