import TasteScape from "../assets/svgs/TasteScape.svg";
import lock from "../assets/svgs/lock.svg";
import emailSvg from "../assets/svgs/email.svg";
import recipebook from "./recipebook.svg";
import chefslide from "./chefslide.svg";
import grocery from "./grocery.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";
const Login = () => {
  const sliderImgs = [chefslide, recipebook, grocery];
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [currIndex, setCurrIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const { userInfo, error,loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  useEffect(() => {
    const autoSlider = setInterval(() => {
      setCurrIndex((prevIndex) => {
        if (prevIndex === sliderImgs.length - 1 && direction === 1) {
          setDirection(-1);
          return prevIndex - 1;
        } else if (prevIndex === 0 && direction - 1) {
          setDirection(1);
          return prevIndex + 1;
        } else {
          return prevIndex + direction;
        }
      });
    }, 5000);

    return () => clearInterval(autoSlider);
  }, [currIndex]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };
  // if(loading){
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }
  return (
    <div className="lg:flex items-center">
      <div className="hidden relative lg:flex items-center justify-center w-[600px] xl:w-[800px] 2xl:w-[1000px] h-screen bg-customPink">
        <div className="slide-container">
          <div className="w-[550px]  overflow-hidden">
            <div
              className="grid grid-cols-3 items-center gap-[5rem] "
              style={{
                width: `${sliderImgs.length * 100}%`,
                transform: `translateX(-${currIndex * 33}%)`,
                transition: `0.5s ease-in-out`,
              }}
            >
              {sliderImgs.map((img) => (
                <img src={img} alt="" className="w-[700px]" />
              ))}
            </div>
          </div>
          <div className="text-center text-[#ffffff]">
            <h1 className=" text-[20px] font-bold mt-10 mb-2">
              {currIndex === 0
                ? "Turn your Ideas into reality "
                : currIndex === 1
                ? "Explore a wide variety of Recipes"
                : "Craft your own Recipes"}
            </h1>
            <p className="text-sm px-4">
              {currIndex === 0
                ? "Create and Innovate your own culinary legacy"
                : currIndex === 1
                ? "Discover vast recipes from around the world"
                : "Dive into the world of cooking and unleash your creativity by crafting your own delicious recipes"}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 flex gap-2">
          <div
            className={`w-[8px] h-[8px] rounded-full ${
              currIndex === 0 ? "bg-white" : "bg-[#ffffff46]"
            }`}
          ></div>
          <div
            className={`w-[8px] h-[8px] rounded-full ${
              currIndex === 1 ? "bg-white" : "bg-[#ffffff46]"
            }`}
          ></div>
          <div
            className={`w-[8px] h-[8px] rounded-full ${
              currIndex === 2 ? "bg-white" : "bg-[#ffffff46]"
            }`}
          ></div>
        </div>
      </div>
      <form
        action=""
        className="login-form w-[300px] mt-[15rem] m-auto lg:m-auto font-sans"
        onSubmit={handleSubmit}
      >
        {/* TITLE */}
        <div className="flex justify-center mb-5">
          <img src={TasteScape} alt="" />
        </div>

        <div className="grid gap-2 text-xs">
          {/* EMAIL INPUT */}
          <div className="flex border-[1px]  border-[#e7e7e7] py-2 px-4 gap-2 bg-white rounded-md">
            <img src={emailSvg} alt="" className="w-[25px] " />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full outline-none"
              placeholder="Email"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex border-[1px]  border-[#e7e7e7] py-2 px-4 gap-2 bg-white rounded-md">
            <img src={lock} alt="" className="w-[21px] " />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full outline-none"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="border-2 border-customPink p-3  text-customPink">{error}</div>

          )}
          {/* SIGN-IN BTN */}
          <div className="signin-btn flex justify-center my-5 text-xs">
            <button
              type="submit"
              className="bg-customPink text-white w-full py-3 rounded-md"
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-[#a1a1a1]">
              Dont have an account?{" "}
              <span className="text-customPink">Create One</span>
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
