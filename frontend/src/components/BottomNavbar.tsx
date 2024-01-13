//React
import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNavbar = () => {
  const [iconIndex, selectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/Home':
        selectedIndex(0);
        break;
      case '/favorite':
        selectedIndex(1);
        break;
      case '/MyRecipes':
        selectedIndex(2);
        break;
      case '/profile':
        selectedIndex(3);
        break;
      default:
        selectedIndex(null);
        break;
    }
  },[])
  const handleClick = (index: number) => {
    selectedIndex(index);

    switch(index){
      case 0:
        navigate('/Home')
        break;
      case 1 :
        navigate('/Likes')
        break;
      case 2 :
        navigate('/MyRecipes')
        break;
      case 3 :
        navigate('/Profile')
        break;
    }
  };

  return (
    <>
      <div className="bot-nav flex justify-around items-center fixed w-full h-16 rounded-t-3xl p-4 bg-customPink bottom-0 sm:hidden">
        {/* HOME SVG */}
        <svg
          width="20px"
          height="25px"
          viewBox="0 0 24 24"
          onClick={() => handleClick(0)}
          fill={iconIndex === 0 ? "#000" : "none"}
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
              stroke="#000"
              stroke-width="1.5"
            />{" "}
            <path
              d="M15 18H9"
              stroke={iconIndex === 0 ? "#FF6F6F" : "#000"}
              stroke-width="1.5"
              stroke-linecap="round"
            />{" "}
          </g>
        </svg>

        {/* HEART SVG */}
        <svg
          width="25px"
          height="30px"
          viewBox="0 0 24 24"
          onClick={() => handleClick(1)}
          fill={iconIndex === 1 ? "#000" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.048"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
          </g>
        </svg>

        {/* ADD SVG */}
        <svg
          width="23px"
          height="20px"
          viewBox="0 0 24 24"
          onClick={() => handleClick(2)}
          fill={iconIndex === 2 ? "#000" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
            <path
              d="M8 12H16"
              stroke={iconIndex === 2 ? "#FF6F6F" : "black"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
            <path
              d="M12 16V8"
              stroke={iconIndex === 2 ? "#FF6F6F" : "black"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />{" "}
          </g>
        </svg>

        {/* PROFILE SVG */}
        <svg
          width="22px"
          height="25px"
          viewBox="0 0 24.00 24.00"
          onClick={() => handleClick(3)}
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          fill={iconIndex === 3 ? "#000" : "none"}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#000"
            stroke-width="1.968"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="1"
              d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
              stroke={iconIndex === 3 ? "#FF6F6F" : "#000000"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity= "1"
              d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
              stroke={iconIndex === 3 ? "#FF6F6F" : "#000000"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
    </>
  );
};
