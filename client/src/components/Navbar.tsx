
import userSvg  from "../assets/svgs/userIcon.svg";
const Navbar:React.FC = () =>{


    return(
        <>
        <nav className="hidden sticky top-0 justify-center w-full bg-white z-20 lg:flex p-5 shadow-md ">
            <div className="container w-full justify-between flex items-center mx-5">
                <div className="flex items-center">
                <button>
              
            </button>
            <h1>TASTESCAPE</h1>


            </div>
                <div className="grid grid-cols-3 list-none gap-10">
                    <li><a href="">Home</a></li>
                    <li><a href="">Features</a></li>
                    <li><a href="">Create</a></li>
                    
                </div>
            <img className="w-7" src={userSvg} alt="" />
            </div>
        </nav>
        </>
    )    

}

export default Navbar;