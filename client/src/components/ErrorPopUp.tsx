import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { displayError, displaySuccessMsg } from "../Redux/likedRecipeSlice";
import addedRecipe from "../assets/svgs/addedRecipe.svg";

const ErrorPopUp: React.FC = () => {
  const error = useSelector((state: RootState) => state.likedRecipes.error);
  const successMsg = useSelector(
    (state: RootState) => state.likedRecipes.successMsg
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
  
    if (error) {
      dispatch(displayError(error));
  
      timeout = setTimeout(() => {
        dispatch(displayError(null));
        dispatch(displaySuccessMsg(null));
      }, 2000);
    }
  
    if (successMsg) {
      dispatch(displaySuccessMsg(successMsg));
  
      timeout = setTimeout(() => {
        dispatch(displayError(null));
        dispatch(displaySuccessMsg(null));
      }, 2000);
    }
  
    return () => clearTimeout(timeout);
  
  }, [error, successMsg, dispatch]);

  return (
    <>
      {error && (
      <div
        className={`fixed flex justify-center items-center top-20 lg:top-24 z-20 w-full h-20`}
      >
        <div className="p-4 bg-gray-100 rounded-lg w-[250px] text-xs xl:text-lg lg:w-[400px]">
          <h1 className="text-xs font-semibold lg:text-sm">{error}</h1>
        </div>
      </div>
      )}

      {successMsg && !error && (
        <div
          className={`
           fixed
           flex justify-center items-center top-20 z-20 w-full h-20`}
        >
          <div className="flex items-center justify-center bg-gray-100 rounded-lg w-[250px] p-4 text-xs xl:text-lg xl:w-[400px]">
            <img src={addedRecipe} className="h-10" alt="" />
            <h1 className="ml-5 text-center text-sm">{successMsg}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPopUp;
