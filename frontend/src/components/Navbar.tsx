
import userSvg  from "../assets/svgs/user-circle-svgrepo-com.svg";
const Navbar:React.FC = () =>{


    return(
        <>
        <nav className="flex justify-center w-full p-5 shadow-md">
            <div className="container justify-between flex items-center mx-5">
                <div className="flex items-center">
                <button>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
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