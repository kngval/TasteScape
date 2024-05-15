// REACT & REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect, useState } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
// COMPONENTS
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { Recipes } from "../components/Recipes";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import Recipe from "../interfaces/IRecipes";
import { useNavigate } from "react-router-dom";

interface Profile {
  image: string;
  cover: string;
  name: string;
}

const Profile = () => {
  const [createdRecipes, setCreatedRecipes] = useState<Recipe[]>([]);
  const { likedRecipes } = useSelector(
    (state: RootState) => state.likedRecipes
  );
  const token = useSelector((state: RootState) => state.auth.userInfo?.token);
  const [profile, setProfile] = useState<Profile>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchLikedRecipes());
    fetchProfile();
    fetchCreatedRecipes();
  }, [dispatch]);

  const fetchCreatedRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data) {
        setCreatedRecipes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  if (!likedRecipes || !createdRecipes || !profile) {
    return(
    <div className="h-screen w-full flex justify-center items-center">
      <LoadingSpinner />
    </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="parent-wrapper w-full flex flex-col items-center lg:justify-center mb-[5rem]">
        {/* PFP & HEADER */}
        <div className="pfp-page-wrapper w-full lg:w-[70%]">
          <div className="pfp-header-wrapper  flex flex-col  items-center relative w-full  bg-[#fcfcfc] ">
            <div className="head w-full h-[200px] lg:h-[300px] ">
              <img
                src={profile?.cover}
                alt="cover photo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="z-50 flex flex-col lg:flex-row items-center lg:justify-between lg: lg:w-full lg:p-4 -mt-[5rem] lg:mb-0">
              <div className="lg:flex items-center ">
                <div className="pfp-icon-container flex justify-center items-center rounded-full w-[200px] h-[200px]  mb-2">
                  {/* PFP HERE */}
                  <img
                    src={profile?.image}
                    alt="pfp"
                    className="w-full h-full object-cover object-center rounded-full"
                  />
                </div>
                <div className="pfp-name text-center lg:text-start ml-0  lg:ml-[1rem] mb-2 lg:mb-0 w-[200px]">
                  <h1 className="font-medium text-md md:text-lg lg:text-2xl">
                    {profile?.name}
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

          <div className="p-4 bg-[#fcfcfc] w-full">
            <h1 className="mb-2 ml-2 text-lg">Liked Recipes</h1>
            <div className=" flex flex-col items-center ">
              <div className="w-full flex  overflow-x-auto scrollbar-style ">
                <div className="flex gap-2 pb-4">
                  {likedRecipes &&
                    likedRecipes.map((liked, index) => (
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
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#fcfcfc] w-full">
            <h1 className="mb-2 ml-2 text-lg">Created Recipes</h1>
            <div className=" flex flex-col items-center ">
              <div className="w-full flex  overflow-x-auto scrollbar-style ">
                <div className="flex gap-2 pb-4">
                  {createdRecipes &&
                    createdRecipes.length > 0 &&
                    createdRecipes.map((liked, index) => (
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavbar />
    </>
  );
};

export default Profile;
