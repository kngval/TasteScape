import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../Redux/store"
import { deleteLikedRecipe, displayError, displaySuccessMsg } from "../Redux/likedRecipeSlice";
export const ErrorPopUp = ({id} : {id:number}) => {
    const error = useSelector((state:RootState) => state.likedRecipes.error)
    const dispatch = useDispatch<AppDispatch>();
  const closePopUp =()=>{
    dispatch(displayError(null))
    dispatch(displaySuccessMsg(null))
  }

  const handleDelete = () => {
    dispatch(deleteLikedRecipe(id))
  }
  
return(
    <>
          <div
        className={`${
          error ? "fixed" : "hidden"
        } flex justify-center items-center top-20 lg:top-24 z-20 w-full h-20`}
      >
        <div className="p-4 bg-gray-100 rounded-lg w-[250px]  text-xs xl:text-lg  lg:w-[400px]">
          <h1 className="text-xs font-semibold lg:text-sm">{error}</h1>
          <h3 className="text-xxs lg:text-xs">Do you want to remove it?</h3>
          <div className="w-full text-end text-xxs mt-3 lg:text-sm">
            <button className="px-4 py-1 bg-customPink shadow-lg rounded-sm" onClick={() => handleDelete()}>Yes</button>
            <button className="px-4 py-1 border-1 border-gray-100  shadow-lg  ml-2 rounded-sm" onClick={closePopUp}>No</button>
          </div>
        </div>
      </div>
    </>
)

}