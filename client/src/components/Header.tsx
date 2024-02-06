import ghibli1 from "../assets/images/ghibli1.jpg";
import SearchForm from "./SearchForm";

export const HomeSlider: React.FC = () => {
  return (
    <>
      <div className="img-container  mb-10 relative">
        <div className="gradient w-full absolute z-10 bg-gradient-to-b from-transparent to-black h-full">
          
        </div>
        <img src={ghibli1} className="w-full  h-full object-cover " alt="" />
        <SearchForm />
      </div>     
    </>
  );
};
