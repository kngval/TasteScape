import { PacmanLoader } from "react-spinners";


const LoadingSpinner = () => {

  return (
        <div className="w-full my-20 flex justify-center">
          <PacmanLoader color="#FF6F6F" />
        </div>
  );
};

export default LoadingSpinner;