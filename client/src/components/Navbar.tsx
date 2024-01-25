
import userSvg  from "../assets/svgs/userIcon.svg";
const Navbar:React.FC = () =>{


    return(
        <>
        <nav className="hidden justify-center w-full  lg:flex p-5 shadow-md ">
            <div className="container justify-between flex items-center mx-5">
                <div className="flex items-center">
                <button>
              
            </button>
            <h1>TASTESCAPE</h1>

        
            </div>
            <img className="w-7" src={userSvg} alt="" />
            </div>
        </nav>
        </>
    )    

}

export default Navbar;