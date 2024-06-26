import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import chef3 from "../assets/svgs/MyRecipes/chef3.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatedRecipeComponent from "../components/CreatedRecipeComponent";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

interface CreatedRecipe {
  _id: string;
  title: string;
  image: string;
}

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState<CreatedRecipe[]>([]);
  const token = useSelector((state: RootState) => state.auth.userInfo?.token);
  useEffect(() => {
    fetchCreatedRecipes();
  }, [myRecipes]);

  const fetchCreatedRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="mt-[4rem] mb-[5rem]  ">
        <div className="w-full flex justify-center ">
          <div
            className="bg-customPink p-2 text-sm lg:text-lg text-white rounded-sm cursor-pointer"
            onClick={() => navigate("/my-recipes/createRecipe")}
          >
            <h1>Click here to Create your own Recipe</h1>
          </div>
        </div>
        {myRecipes.length === 0 && (
          <div>
            <div className="w-full h-[300px] flex justify-center mt-10">
              <img src={chef3} className="w-full h-full" alt="" />
            </div>
            <div className="w-full flex justify-center text-sm lg:text-lg  mt-5">
              <h1 className="p-4 w-[90%] text-center">
                Empower your kitchen; innovate, taste, and craft your own
                culinary Legacy
              </h1>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {myRecipes &&
            myRecipes.length > 0 &&
            myRecipes.map((recipe) => (
              <div className="text-xs md:text-sm xl:text-md  bg-white  border-gray-200 border-2">
                <CreatedRecipeComponent
                  _id={recipe._id}
                  title={recipe.title}
                  image={recipe.image}
                />
              </div>
            ))}
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default MyRecipes;
