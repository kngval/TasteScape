//REACT
import { useState } from "react";

//COMPONENTS
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
//icons
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdClear } from "react-icons/md";

//SVG
import instructions from "../assets/svgs/MyRecipes/instructions.svg";
import basket from "../assets/svgs/MyRecipes/basket.svg";
import nutrition from "../assets/svgs/MyRecipes/nutrition.svg";
import save from "../assets/svgs/MyRecipes/save.svg";
import clear from "../assets/svgs/MyRecipes/clear.svg";

const CreateRecipe: React.FC = () => {
  //FOOD INFO
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [servings, setServings] = useState<number>(0);
  const [healthScore, setHealthScore] = useState<number>(0);
  // INGREDIENTS INPUT
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [ingredientName, setIngredientName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [measurement, setMeasurement] = useState<string>("");

  //INSTRUCTIONS INPUT
  const [instruction, setInstruction] = useState("");
  const [instructionList, setInstructionList] = useState<string[]>([]);

  // NUTRITION INPUT
  const [nutrients, setNutrients] = useState<string[]>([]);
  const [label, setLabel] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  //MODAL STATE
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
  const [isOpenClearModal, setIsOpenClearModal] = useState(false);

  // INGREDIENT FUNCTIONS
  //ADD INGREDIENTS
  const addIngredients = () => {
    const newIngredient = `${quantity} ${measurement} ${ingredientName}`;
    setIngredient((prevIngredients) => [...prevIngredients, newIngredient]);
    setQuantity(0);
    setMeasurement("");
    setIngredientName("");
  };
  //REMOVE INGREDIENTS
  const removeIngredient = (ingredientToRemove: number) => {
    setIngredient((prevIngredient) =>
      prevIngredient.filter(
        (_ingredients, index) => index !== ingredientToRemove
      )
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
    setDishName("");
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

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center text-xs md:text-md mt-4 mb-[6rem]">
        <form action="" className="w-[90%] lg:w-[900px]  grid gap-8 ">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="">
              <label>
                Name: <span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="text"
                className="block w-full p-2 border-2 rounded-md outline-none"
                placeholder="e.g Filipino Chicken Adobo"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                required
              />
            </div>
            <div className="">
              <label>Cuisine Type : </label>
              <select
                name=""
                id=""
                className=" block p-2 w-full border-2 rounded-md outline-none bg-white ease-in-out transition duration-300"
                required
              >
                <option value="">Select a cuisine type :</option>
                <option value="">Chinese</option>
                <option value="">Filipino</option>
                <option value="">Italian</option>
                <option value="">Thai</option>
                <option value="">Indian</option>
                <option value="">Italian</option>
                <option value="">Japanese</option>
                <option value="">Korean</option>
                <option value="">Mexican</option>
                <option value="">Greek</option>
                <option value="">British</option>
                <option value="">American</option>
                <option value="">Carribean</option>
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
            <label>Image(Optional) :</label>
            <input type="file" src="" alt="" className="hidden" />
            <div
              className="w-full h-[200px] flex flex-col justify-center items-center bg-[#fff]  border-2 rounded-md"
              onClick={() => {}}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[50px]"
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
          </div>

          <div className="grid lg:grid-cols-3 gap-2 lg:gap-5">
            <div>
              <label>Cooking Time in Minutes :</label>
              <input
                type="number"
                name=""
                id=""
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={cookingTime}
                onChange={(e) => setCookingTime(parseFloat(e.target.value))}
                required
              />
            </div>

            <div>
              <label>Servings :</label>
              <input
                type="number"
                name=""
                id=""
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={servings}
                onChange={(e) => setServings(parseFloat(e.target.value))}
                required
              />
            </div>
            <div>
              <label>Health Score :</label>
              <input
                type="number"
                name=""
                id=""
                className="block border-2 p-1 rounded-md w-full outline-none"
                value={healthScore}
                onChange={(e) => setHealthScore(parseFloat(e.target.value))}
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
                      onChange={(e) => setQuantity(parseFloat(e.target.value))}
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
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
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
        </form>
      </div>
      <Modal isOpen={isOpenSubmitModal}>
        <div className="flex justify-center items-center mb-5">
          <img src={save} alt="" className="h-[150px]" />
        </div>
        <div className="text-xxs sm:text-sm text-center mb-4">
          Are you sure you want to create this recipe?
          <span className="font-semibold text-customPink text-sm lg:text-xl block uppercase">
            {dishName}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 text-sm gap-2">
          <button className="py-2 bg-customPink text-white rounded-full">
            Create Recipe
          </button>
          <button
            className="py-2 border-2 border-customPink rounded-full text-customPink"
            onClick={() => setIsOpenSubmitModal(false)}
          >
            Close
          </button>
        </div>
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
      <BottomNavbar />
    </>
  );
};

export default CreateRecipe;
