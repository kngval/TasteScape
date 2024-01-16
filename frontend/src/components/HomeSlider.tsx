import ghibli1 from "../assets/images/ghibli1.jpg";

export const HomeSlider: React.FC = () => {
  return (
    <>
      <div className="img-container mx-4 my-5 lg:p-10">
        <img src={ghibli1} className="w-full  h-full object-cover rounded-xl" alt="" />
      </div>     
    </>
  );
};
