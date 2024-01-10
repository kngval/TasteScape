import home from "../assets/svgs/BotNav/home.svg";
import heart from "../assets/svgs/BotNav/heart.svg";


export const BottomNavbar = () => {
  return (
    <>
      <div className="bot-nav flex justify-around items-center fixed w-full h-16 rounded-t-3xl p-4 bg-customPink bottom-0 sm:hidden">
        
          <img src={home} className="" alt="" />
          <img src={heart} className="" alt="" />
        
        
          <img src={home} className="" alt="" />
          <img src={home} className="" alt="" />
        
      </div>
    </>
  );
};
