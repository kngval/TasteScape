import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import { displaySuccessMsg } from "../Redux/likedRecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface CreatedRecipe {
  _id: string;
  title: string;
  image: string;
}

const CreatedRecipeComponent: React.FC<CreatedRecipe> = ({
  _id,
  image,
  title,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/my-recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(displaySuccessMsg("Deleted Recipe"));
      }
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };
  return (
    <>
      <Link to={`/my-recipes/${_id} `}>
        <div className="h-[200px]">
          <img
            src={image}
            className="food-img w-full h-full object-cover object-center"
            alt=""
          />
        </div>
      </Link>

      <div className="foodName  flex justify-between items-center px-4 py-3 ">
        <div className="text-start w-3/4">
          <h1 className="">{title}</h1>
        </div>
        <div className="">
          <FaTrash onClick={() => handleDelete(_id)} />
        </div>
      </div>
    </>
  );
};

export default CreatedRecipeComponent;
