// REACT & REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect } from "react";
import { fetchLikedRecipes } from "../Redux/likedRecipeSlice";
// COMPONENTS
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import { Recipes } from '../components/Recipes'
import LoadingSpinner from "../components/LoadingSpinner";
const Profile = () => {

  const {likedRecipes , loading} = useSelector((state:RootState) => state.likedRecipes)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchLikedRecipes());
  },[dispatch])
  return (
    <>
      <Navbar />
      <div className="parent-wrapper w-full flex flex-col items-center lg:justify-center ">

        {/* PFP & HEADER */}
        <div className="pfp-page-wrapper w-full lg:w-[70%]">
          <div className="pfp-header-wrapper  flex flex-col  items-center relative w-full  bg-[#fcfcfc] ">
            <div className="head w-full h-[200px] lg:h-[300px] ">
              <img src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/420924621_1928494867552019_7848630957939104409_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeF4u2npJvVUIbJgTwJwdHcqPMu6VVFecgo8y7pVUV5yCoAq63Si4CxjHMTOqVJrthF5ckVK1AETQI_2uWg3HGxs&_nc_ohc=6eTGzbaruGMAX9w25DP&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfBD0y9PHyIFV6MzFGK0SWD_okrvYKY0Yvtm3cuL7AzGcQ&oe=65EB644B" alt="" className="w-full h-full object-cover object-center"/>
            </div>
            <div className="z-50 flex flex-col lg:flex-row items-center lg:justify-between lg: lg:w-full lg:p-4 -mt-[5rem] lg:mb-0">
              <div className="lg:flex items-center">
            <div className="pfp-icon-container flex justify-center items-center rounded-full w-[200px] h-[200px]  mb-2 border-[5px] border-[#fcfcfc] ">
              <img src="https://scontent.fmnl4-6.fna.fbcdn.net/v/t39.30808-6/427946549_1941758782892294_7126879791046981568_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHhM_bqgOcQmV04dBxhSi1zBg8ymP9XlHUGDzKY_1eUdYgXEohr-o614_geGqMbI_AjeEVBmSQ3JsnYUGMwaLXY&_nc_ohc=-eAsjLjSAOwAX8prQyp&_nc_ht=scontent.fmnl4-6.fna&oh=00_AfB-BdqK76JdCxdibjs0KE1AzzG9yvCOHr4fn4b5CnFaIw&oe=65EA0FF3" alt=""  className="w-full h-full object-cover object-center rounded-full" />
            </div>
            <div className="pfp-name text-center lg:ml-[1rem] mb-2 lg:mb-0">
              <h1 className="font-medium text-lg lg:text-2xl lg:font-extrabold tracking-tighter">
                Brent King Valino
              </h1>
            </div>
            </div>
             <div className=" bg-customPink flex justify-center items-end w-[80%] lg:w-[200px] text-white px-4 py-2 rounded-md text-sm ">
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
            {likedRecipes && likedRecipes.map((liked) => (
               <div className="text-xs md:text-sm xl:text-md  bg-white w-[200px] sm:w-[300px] lg:w-[300px] border-gray-200 border-2">
               <Recipes
                 key={liked.id}
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
