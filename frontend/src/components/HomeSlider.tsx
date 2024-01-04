import ghibli1 from "../assets/ghibli1.jpg";

export const HomeSlider: React.FC = () => {
  return (
    <>
      <div className="img-container mx-4 my-10">
        <img src={ghibli1} className="w-full h-full object-cover   rounded-xl" alt="" />
      </div>     
    </>
  );
};
