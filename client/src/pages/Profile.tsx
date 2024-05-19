// REACT & REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect, useState } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
// COMPONENTS
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { Recipes } from "../components/Recipes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import favRecipes from "../assets/svgs/favorites.svg";
import chef from "../assets/svgs/MyRecipes/chef3.svg";
import initialUser from "../assets/svgs/initialUser.svg";
import CreatedRecipeComponent from "../components/CreatedRecipeComponent";
import { logout } from "../Redux/authSlice";
interface Profile {
  image: string;
  cover: string;
  name: string;
}

interface CreatedRecipe {
  _id: string;
  title: string;
  image: string;
}

const Profile = () => {
  const [createdRecipes, setCreatedRecipes] = useState<CreatedRecipe[]>([]);
  const { likedRecipes } = useSelector(
    (state: RootState) => state.likedRecipes
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [profile, setProfile] = useState<Profile>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile();

    dispatch(fetchLikedRecipes());
    fetchCreatedRecipes();
  }, [dispatch]);

  const fetchCreatedRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-recipes", {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      if (response.data) {
        setCreatedRecipes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      if (response.data) {
        setProfile(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="parent-wrapper w-full flex flex-col items-center lg:justify-center mb-[5rem] ">
        {/* PFP & HEADER */}
        <div className="pfp-page-wrapper w-full lg:w-[70%] bg-white">
          <div className="pfp-header-wrapper  flex flex-col  items-center relative w-full  ">
            <div
              className={`head w-full h-[200px] lg:h-[300px] ${
                !profile?.cover ? "bg-customPink" : "bg-none"
              }`}
            >
              <img
                src={profile?.cover}
                alt=""
                className={`w-full h-full object-cover object-center`}
              />
            </div>
            <div className="z-50 flex flex-col lg:flex-row items-center lg:justify-between lg: lg:w-full lg:p-4 -mt-[5rem] lg:mb-0">
              <div className="lg:flex items-center ">
                <div className="pfp-icon-container flex justify-center items-center rounded-full w-[200px] h-[200px]  mb-2 border-[0.5rem] border-customPink">
                  {/* PFP HERE */}
                  <img
                    src={profile?.image ? profile.image : initialUser}
                    alt="pfp"
                    className={`w-full h-full object-cover object-center rounded-full ${
                      !profile?.image ? "bg-white" : "k bg-none"
                    }`}
                  />
                </div>
                <div className="pfp-name text-center lg:text-start ml-0  lg:ml-[1rem] mb-2 lg:mb-0 w-[200px] lg:w-[250px]">
                  <h1 className=" text-md md:text-lg lg:text-2xl">
                    {profile?.name ? profile.name : userInfo?.email}
                  </h1>
                </div>
              </div>

              <div
                onClick={() => navigate("/profile/edit-profile")}
                className=" bg-customPink flex justify-center items-center w-[80%] lg:w-[170px] h-[40px] text-white px-2 lg:px-4 py-2 rounded-md text-sm "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-[20px] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h1>Edit Profile</h1>
              </div>
            </div>
            <div className="w-[95%] h-[1px] bg-gray-300 mt-[2rem] mb-[1rem]"></div>
          </div>

          <div className="px-4 py-12 w-full">
            <h1 className="mb-2 ml-2 text-lg">Liked Recipes</h1>
            <div className=" flex flex-col items-center ">
              <div className="w-full flex  overflow-x-auto scrollbar-style ">
                {likedRecipes && likedRecipes.length > 0 ? (
                  <div className="flex gap-2 pb-4">
                    {likedRecipes.map((liked, index) => (
                      <div className="text-xs md:text-sm xl:text-md  bg-white w-[200px] sm:w-[300px] lg:w-[300px] border-gray-200 border-2">
                        <Recipes
                          key={index}
                          id={liked.id}
                          image={liked.image}
                          title={liked.title}
                          isLiked={liked.isLiked}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <img src={favRecipes} alt="" className="w-[300px]" />
                    <h1>Liked recipes will be displayed here</h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-12  w-full">
            <h1 className="mb-2 ml-2 text-lg">Created Recipes</h1>
            <div className=" flex flex-col items-center ">
              <div className="w-full flex  overflow-x-auto scrollbar-style ">
                {createdRecipes && createdRecipes.length > 0 ? (
                  <div className="flex gap-2 pb-4">
                    {createdRecipes.map((recipe, index) => (
                      <div className="text-xs md:text-sm xl:text-md  bg-white w-[200px] sm:w-[300px] lg:w-[300px] border-gray-200 border-2">
                        <CreatedRecipeComponent
                          key={index}
                          _id={recipe._id}
                          image={recipe.image}
                          title={recipe.title}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-5">
                    <img src={chef} alt="" className="w-[300px]" />
                    <h1>Created Recipes will be displayed here</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => dispatch(logout())}
          type="button"
          className="bg-customPink text-white w-[300px] py-2 rounded-md my-8"
        >
          Logout
        </button>
      </div>

      <BottomNavbar />
    </>
  );
};

export default Profile;
