// import food1 from "../assets/images/food1.png";
// import food2 from "../assets/images/food2.png";
import { useEffect, useState } from "react";
import food3 from "../assets/images/food3.png";
import food4 from "../assets/images/food4.jpg";
import food5 from "../assets/images/food5.jpg";
import food6 from "../assets/images/food6.jpg";

export const Header: React.FC = () => {
  const foodArr = [food3, food4, food5, food6];
 

  const [currIndex,setCurrIndex] = useState(0)
  const [direction, setDirection] = useState(1);
  useEffect(() => {
    const autoSlider = setInterval(() => {
      setCurrIndex((prevIndex) => {
        if (prevIndex === foodArr.length - 1 && direction === 1) {
          setDirection(-1);
          return prevIndex - 1;
        } else if (prevIndex === 0 && direction === -1) {
          setDirection(1);
          return prevIndex + 1;
        } else {
          return prevIndex + direction;
        }
      });
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(autoSlider);
  }, [currIndex]);


  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px]  overflow-x-hidden overflow-y-visible">
      <div className="gradient bg-[#00000073] absolute top-0 w-full h-full z-10  text-white flex flex-col items-center justify-center p-4">
        <h1 className="headline text-3xl sm:text-5xl">TASTESCAPE</h1>
        <p className="text-center text-xs sm:text-lg ">Embark on a Journey Through Flavorful Creations in the Heart of Home Cooking.</p>
      </div>
      <div
        className="flex h-full"
        style={{
          width: `${foodArr.length * 100}%`,
          transform: `translateX(-${currIndex * 25}%)`,
          transition: `0.5s ease-in-out`
        }}
      >
        {foodArr.map((img, index) => (
          <img
            src={img}
            key={index}
            className="object-cover object-center h-full w-full"
          />
        ))}
      </div>

    </div>
  );
};
