//REACT
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
//icons
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

//SVG
import instructions from "../assets/svgs/MyRecipes/instructions.svg";
import basket from "../assets/svgs/MyRecipes/basket.svg";
import nutrition from "../assets/svgs/MyRecipes/nutrition.svg";
import save from "../assets/svgs/MyRecipes/save.svg";
import clear from "../assets/svgs/MyRecipes/clear.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  // const [preview, setPreview] = useState<string | null>();
  const [description, setDescription] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [servings, setServings] = useState<number>(0);
  const [healthScore, setHealthScore] = useState<number>(0);
  const [cuisineType, setCuisineType] = useState<string>("");
  //ingredients input
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [ingredientName, setIngredientName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [measurement, setMeasurement] = useState<string>("");
  //INSTRUCTIONS INPUT
  const [instructionList, setInstructionList] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>("");
  //NUTRITION INPUT
  const [nutrients, setNutrients] = useState<string[]>([]);
  const [label, setLabel] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  //MODAL STATE
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
  const [isOpenClearModal, setIsOpenClearModal] = useState(false);
  const token = useSelector((state: RootState) => state.auth.userInfo?.token);

  //Handling Image
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          console.log(reader.result);
        }
      };
    }
  };

  // INGREDIENT FUNCTIONS
  //ADD INGREDIENTS
  const addIngredients = () => {
    const newIngredient = `${quantity} ${measurement} ${ingredientName}`;

    setIngredient((prevIngredients) => [...prevIngredients, newIngredient]);
    setIngredientName("");
    setQuantity(0);
    setMeasurement("");
  };
  //REMOVE INGREDIENTS
  const removeIngredient = (ingredientToRemove: number) => {
    setIngredient((prevIngredient) =>
      prevIngredient.filter((_, index) => index !== ingredientToRemove)
    );
  };

  // INSTRUCTIONS FUNCTIONS
  const addInstruction = () => {
    setInstructionList((prevInstructions) => [
      ...prevInstructions,
      instruction,
    ]);
    setInstruction("");
  };

  const removeInstruction = (indexToRemove: number) => {
    setInstructionList((prevInstructions) =>
      prevInstructions.filter((_, index) => index !== indexToRemove)
    );
  };

  // NUTRITION FUNCTIONS
  const addNutrients = () => {
    const newNutrients = `${amount} ${unit} ${label}`;
    setNutrients((prevNutrients) => [newNutrients, ...prevNutrients]);
    setAmount(0);
    setUnit("");
    setLabel("");
  };

  const deleteNutrients = (index: number) => {
    setNutrients((prevNutients) =>
      prevNutients.filter((_, nutrientIndex) => nutrientIndex !== index)
    );
  };

  //CLEAR ALL FIELDS
  const clearAllFields = () => {
    //FOOD INFO
    setTitle("");
    setDescription("");
    setCookingTime(0);
    setServings(0);
    setHealthScore(0);
    //INGREDIENTS INFO
    setIngredient([]);
    setIngredientName("");
    setQuantity(0);
    setMeasurement("");

    //INSTRUCTIONS INFO
    setInstructionList([]);
    setInstruction("");

    //NUTRITION INFO
    setNutrients([]);
    setLabel("");
    setAmount(0);
    setUnit("");

    setIsOpenClearModal(false);
  };

  const createRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const recipe = {
        title,
        description,
        cuisineType,
        image,
        cookingTime,
        servings,
        healthScore,
        ingredients: ingredient,
        instructions: instructionList,
        nutrients,
        createdAt: new Date(),
      };

      const response = await axios.post(
        "http://localhost:3000/my-recipes/createRecipe",
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/my-recipes");
        }, 2000);
      }
      console.log("RECIPE CREATED : ", data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center text-xs md:text-md mt-4 mb-[6rem]">
        <form
          action=""
          className="w-[90%] lg:w-[900px]  grid gap-8"
          onSubmit={createRecipe}
        >
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="">
              <label>
                Name: <span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="text"
                className="block w-full p-2 border-2 rounded-md outline-none"
                placeholder="e.g Filipino Chicken Adobo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                name="title"
              />
            </div>
            <div className="">
              <label>Cuisine Type : </label>
              <select
                name=""
                id=""
                className=" block p-2 w-full border-2 rounded-md outline-none bg-white ease-in-out transition duration-300"
                required
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              >
                <option value="">Select a cuisine type :</option>
                <option value="Chinese">Chinese</option>
                <option value="Filipino">Filipino</option>
                <option value="Italian">Italian</option>
                <option value="Thai">Thai</option>
                <option value="Indian">Indian</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Mexican">Mexican</option>
                <option value="Greek">Greek</option>
                <option value="British">British</option>
                <option value="American">American</option>
                <option value="Carribean">Carribean</option>
              </select>
            </div>
          </div>

          <div className="">
            <label className="">
              About the Dish : <span className="text-[#FF0000]">*</span>{" "}
            </label>
            <textarea
              name=""
              id=""
              className="block w-full h-[200px] p-2 border-2 rounded-md outline-none"
              placeholder="e.g Adobo is a dish that is usually made with meat (chicken, pork, or beef) marinated in vinegar, soy sauce, garlic, and other spices. The meat is slowly cooked until it becomes tender and flavorful. Adobo is often served with rice and is a staple dish in many Filipino households"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="fileInput">Image(Optional) :</label>
            <input
              id="fileInput"
              type="file"
              src=""
              alt=""
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              name="image"
            />
            <div
              className="w-full h-[300px] sm:h-[400px] flex flex-col justify-center items-center bg-[#fff]  border-2 rounded-md"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {image ? (
                <div className="w-full h-full flex flex-col justify-center gap-2 px-4 text-center">
                  <img
                    src={image}
                    alt=""
                    className="h-[80%] object-cover object-center rounded-md"
                  />
                </div>
              ) : (
                <div className="text-center flex flex-col items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[50px] mr-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                        fill="#808080"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                        fill="#808080"
                      ></path>{" "}
                    </g>
                  </svg>
                  <h1 className="text-[#808080] ">Select an Image</h1>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-2 lg:gap-5">
            <div>
              <label>Cooking Time in Minutes :</label>
              <input
                type="number"
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={cookingTime}
                onChange={(e) =>
                  setCookingTime(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
                required
                name="cookingTime"
              />
            </div>

            <div>
              <label>Servings :</label>
              <input
                type="number"
                name="servings"
                id=""
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={servings}
                onChange={(e) =>
                  setServings(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
                required
              />
            </div>
            <div>
              <label>Health Score :</label>
              <input
                type="number"
                name="healthScore"
                id=""
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={healthScore}
                onChange={(e) =>
                  setHealthScore(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
                required
              />
            </div>
          </div>

          <div className="ingredients-form">
            <div className="ingredients-list flex justify-center mt-4">
              <fieldset className="bg-white border-2 w-full p-4">
                <legend className="text-sm lg:text-lg ml-4">
                  Ingredients List <span className="text-[#FF0000]">*</span>
                </legend>

                <div className="grid lg:grid-cols-3 p-4 lg:justify-items-center gap-4 rounded-md relative">
                  <div className="w-full">
                    <label>Ingredient :</label>
                    <input
                      type="text"
                      className="border-2 p-1 rounded-md block w-full outline-none"
                      onChange={(e) => setIngredientName(e.target.value)}
                      value={ingredientName}
                    />
                  </div>
                  <div className="w-full">
                    <label>Quantity :</label>
                    <input
                      type="number"
                      className="border-2 p-1 rounded-md block w-full outline-none"
                      onChange={(e) =>
                        setQuantity(
                          e.target.value === "" ? 0 : parseFloat(e.target.value)
                        )
                      }
                      value={quantity}
                    />
                  </div>

                  <div className="w-full">
                    <label>Measurement :</label>
                    <input
                      type="text"
                      className="border-2 p-1 rounded-md block w-full outline-none"
                      onChange={(e) => setMeasurement(e.target.value)}
                      value={measurement}
                    />
                  </div>
                </div>
                <div className="w-full px-4  lg:flex lg:justify-end">
                  <div
                    className="flex justify-center items-center bg-customPink text-white p-2 rounded-md cursor-pointer"
                    onClick={addIngredients}
                  >
                    <button type="button" className="flex items-center">
                      <FaPlus className="w-[20px] h-[10px]" />
                      <h1 className="">Add New Ingredient</h1>
                    </button>
                  </div>
                </div>

                <div className="ingredient-lists my-10">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={basket}
                      alt=""
                      className="w-[200px] h-[200px] sm:h-[200px] my-8"
                    />
                    <h1>
                      {ingredient.length === 0
                        ? "Your Ingredients Will be Displayed Here"
                        : `There are ${ingredient.length} ingredients in your Basket`}
                    </h1>
                  </div>

                  <div className="w-full flex justify-center p-4">
                    {ingredient && ingredient.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-2 w-full justify-items-center">
                        {ingredient.map((ingredients, index) => (
                          <div
                            key={index}
                            className=" flex bg-customPink justify-between items-center py-3 lg:py-4 px-4 text-white text-sm rounded-md w-[95%] break-all"
                          >
                            <h1 className="w-[80%]">{ingredients}</h1>
                            <div onClick={() => removeIngredient(index)}>
                              <FaTrash fill="#fff" className="cursor-pointer" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <fieldset className="bg-white border-2 p-4">
            <legend className="text-sm lg:text-lg ml-4">
              Cooking Instructions <span className="text-[#FF0000]">*</span>
            </legend>

            <div className="">
              {/* instruction input */}
              <div className=" flex gap-2 items-center p-6">
                <div className="w-full">
                  <label>Instructions : </label>
                  <input
                    type="text"
                    className="border-2 block p-1 rounded-md w-full outline-none"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </div>

                <div className="translate-y-2 ">
                  <div className="flex justify-center items-center bg-customPink text-white  rounded-md ">
                    <button
                      type="button"
                      className="p-2"
                      onClick={addInstruction}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
              {/* svg image */}
              <div className="flex flex-col items-center my-6">
                <img
                  src={instructions}
                  alt=""
                  className="w-[200px] h-[200px]"
                />
                <h1>Turn your ideas into reality</h1>
              </div>

              {/* mapped instructions */}
              {instructionList && instructionList.length > 0 && (
                <div className="grid gap-2 px-6 mt-2">
                  {instructionList.map((step, index) => (
                    <fieldset key={index} className="border-2  rounded-md">
                      <legend className="text-black ml-4">
                        Step {index + 1}
                      </legend>
                      <div className="flex justify-between items-center mb-2 px-4 py-2">
                        <h1 className="break-all w-[90%]">{step}</h1>
                        <FaTrash
                          onClick={() => removeInstruction(index)}
                          className="cursor-pointer"
                        />
                      </div>
                    </fieldset>
                  ))}
                </div>
              )}
            </div>
          </fieldset>

          <fieldset className="bg-white border-2 p-4">
            <legend className="text-sm lg:text-lg ml-4">Nutrition</legend>

            {/* nutrition label inputs */}
            <div className="grid lg:grid-cols-3 gap-5 px-4">
              <div className="">
                <label>Nutrition Label : </label>
                <input
                  type="text"
                  className="w-full block border-2 p-1 rounded-md"
                  placeholder="e.g Sodium , Protein , Carbohydrates"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>

              <div>
                <label>Amount : </label>
                <input
                  type="number"
                  className="w-full block border-2 p-1 rounded-md"
                  placeholder="0"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value === "" ? 0 : parseFloat(e.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label>Unit : </label>
                <input
                  type="text"
                  className="w-full block border-2 p-1 rounded-md"
                  placeholder="e.g kg , g "
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>

            {/* add nutrition label button */}
            <div className="w-full px-4  lg:flex lg:justify-end">
              <div
                className="flex justify-center items-center bg-customPink text-white p-2 rounded-md cursor-pointer mt-4"
                onClick={addNutrients}
              >
                <button type="button" className="flex items-center">
                  <FaPlus className="w-[20px] h-[10px] translate-y-[1px]" />
                  <h1 className="translate-y-[1px] lg:translate-y-0">
                    Add Nutrition Label
                  </h1>
                </button>
              </div>
            </div>

            {/* svg img */}
            <div className="flex flex-col items-center">
              <img src={nutrition} alt="" className="w-[200px] h-[200px]" />
              <h1>Keep track of what you consume</h1>
            </div>

            {/* MAPPED NUTRITION LABELS */}
            {nutrients && nutrients.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
                {nutrients.map((label, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 lg:py-4 px-4 bg-customPink text-white rounded-md"
                  >
                    <p className="w-[80%] break-all">{label}</p>
                    <FaTrash onClick={() => deleteNutrients(index)} />
                  </div>
                ))}
              </div>
            )}
          </fieldset>
          <div className=" p-4   w-full grid justify-items-center gap-2">
            <button
              type="button"
              className="w-[80%]  bg-customPink py-2 rounded-md text-white text-sm flex items-center justify-center gap-2"
              onClick={() => setIsOpenSubmitModal(true)}
            >
              Create Recipe
              <IoIosCreate className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpenClearModal(true)}
              className="w-[80%] bg-white py-2 rounded-md border-2 text-sm  flex items-center justify-center gap-2"
            >
              Clear All Fields
              <MdClear className="text-lg" />
            </button>
          </div>
          <Modal isOpen={isOpenSubmitModal}>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-[300px] gap-5 p-2">
                <ImSpinner2 className="animate-spin text-[#FF6F6F] text-4xl " />
                <h1 className="">Adding Recipe to Collections...</h1>
              </div>
            ) : success ? (
              <div className="flex flex-col justify-center items-center h-[300px]  gap-5 text-center p-2">
                <FaCheckCircle className=" text-[#FF6F6F] text-5xl " />
                <h1 className="w=">
                  Recipe Added Successfully.{" "}
                  <span className="text-[#FF6F6F] animate-pulse">
                    Redirecting...
                  </span>
                </h1>
              </div>
            ) : (
              <div>
                <div className="flex justify-center items-center mb-5">
                  <img src={save} alt="" className="h-[150px]" />
                </div>
                <div className="text-xs sm:text-sm text-center mb-4">
                  Are you sure you want to create this recipe?
                  <span className="font-semibold text-customPink text-sm lg:text-xl block uppercase">
                    {title}
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 text-sm gap-2">
                  <button
                    className="py-2 bg-customPink text-white rounded-full"
                    type="submit"
                    disabled={loading}
                  >
                    Create Recipe
                  </button>
                  <button
                    className="py-2 border-2 border-customPink rounded-full text-customPink"
                    onClick={() => setIsOpenSubmitModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>

          <Modal isOpen={isOpenClearModal}>
            <div className="flex justify-center items-center mb-5">
              <img src={clear} alt="" className="h-[150px]" />
            </div>
            <div className="text-xs text-center mb-4">
              Are you sure you want to{" "}
              <span className="text-customPink">Clear All Fields</span> ?
            </div>

            <div className="grid lg:grid-cols-2 text-sm gap-2">
              <button
                className="py-2 border-2 border-customPink text-customPink rounded-full"
                onClick={clearAllFields}
              >
                Clear All FIelds
              </button>
              <button
                className="py-3 bg-customPink rounded-full text-white"
                onClick={() => setIsOpenClearModal(false)}
              >
                Close
              </button>
            </div>
          </Modal>
        </form>
      </div>
      <BottomNavbar />
    </>
  );
};

export default CreateRecipe;
