import ghibli1 from "../assets/images/ghibli1.jpg";

export const HomeSlider: React.FC = () => {
  return (
    <>
      <div className="img-container  mb-10">
        <img src={ghibli1} className="w-full  h-full object-cover " alt="" />
      </div>     
    </>
  );
};
