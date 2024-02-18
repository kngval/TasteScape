import food1 from "../assets/images/food1.png";
import food2 from "../assets/images/food2.png";
import food3 from "../assets/images/food3.png";

export const HomeSlider: React.FC = () => {
  const foodArr = [food1, food2, food3];

  return (
    <>
      <div className="relative w-full h-[200px] flex">
          {foodArr.map((img) => (
            <img
              src={img}
              className="absolute h-full w-full object-cover object-center z-10"
            />
          ))}
        <div className="absolute bottom-2 border-2 border-black z-20">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="gradient w-full h-full z-30 bg-gradient-to-b from-black to-white"></div>
      </div>
    </>
  );
};
