
const Navbar:React.FC = () =>{


    return(
        <>
        <nav className="w-full p-7 shadow-md">
            <div className="container justify-between flex items-center">
            <h1>TASTESCAPE</h1>
            <button className="border-2 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            </button>
            </div>
        </nav>
        </>
    )    

}

export default Navbar;