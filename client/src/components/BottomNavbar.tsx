//React

import NavBtns from "./NavBtns";


export const BottomNavbar = () => {
  
  return (
    <>
      <div className="bot-nav lg:hidden flex justify-around items-center fixed w-full h-16 rounded-t-3xl p-4 bg-white bottom-0 z-30 ">
        <NavBtns />
      </div>
    </>
  );
};
