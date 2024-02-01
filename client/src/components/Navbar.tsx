
import userSvg  from "../assets/svgs/userIcon.svg";
const Navbar:React.FC = () =>{


    return(
        <>
        <nav className=" text-sm lg:text-md sticky top-0 flex justify-center w-full bg-white p-4 shadow-md z-20">
            <div className="container w-10/12 justify-between flex items-center mx-5">
                <div className="flex items-center">
                <button>
              
            </button>
            <h1>TASTESCAPE</h1>


            </div>
                <div className="hidden lg:grid grid-cols-3 list-none gap-10">
                    <li><a href="/home">Home</a></li>
                    <li><a href="">Features</a></li>
                    <li><a href="">Create</a></li>
                    
                </div>
            <img className="hidden lg:block w-7" src={userSvg} alt="" />
            </div>
        </nav>
        </>
    )    

}

export default Navbar;