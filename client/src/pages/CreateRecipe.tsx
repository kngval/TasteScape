import { useState } from "react";
import { BottomNavbar } from "../components/BottomNavbar";
import Navbar from "../components/Navbar";



const CreateRecipe: React.FC = () => {
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [ingredientName, setIngredientName] = useState<string>()
  const [quantity, setQuantity] = useState<string>()
  const [measurement,setMeasurement] = useState<string>()

  const addIngredients = () => {
    if(quantity !== undefined && ingredientName !== undefined && measurement !== undefined){
      const newIngredient = quantity + ' ' + measurement + ' ' + ingredientName
      setIngredient(prevIngredients => [...prevIngredients, newIngredient])
      setQuantity('');
      setMeasurement('')
      setIngredientName('')
  }
   
  }

  const removeIngredient = (ingredientToRemove :string) => {
    setIngredient((prevIngredient) => prevIngredient.filter(ingredients => ingredients !== ingredientToRemove));
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center text-xs md:text-md">
        <form action="" className="w-[90%] lg:w-[900px]  grid gap-8 py-5 mb-[5rem]">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="">
              <label>Name :</label>
              <input
                type="text"
                className="block w-full p-2 border-2 rounded-md outline-customPink"
                placeholder="e.g Filipino Chicken Adobo"
                required
              />
            </div>
            <div className="">
              <label>Cuisine Type : </label>
              <select
                name=""
                id=""
                className=" block p-2 w-full border-2 rounded-md outline-customPink bg-white ease-in-out transition duration-300"
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
              About the Dish :{" "}
            </label>
            <textarea
              name=""
              id=""
              className="block w-full h-[200px] p-2 border-2 rounded-md outline-customPink"
              placeholder="e.g Adobo is a dish that is usually made with meat (chicken, pork, or beef) marinated in vinegar, soy sauce, garlic, and other spices. The meat is slowly cooked until it becomes tender and flavorful. Adobo is often served with rice and is a staple dish in many Filipino households"
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
            <input type="number" name="" id="" className="block border-2 p-1 rounded-md w-full" required/>
            </div>

            <div>
            <label>Servings :</label>
            <input type="number" name="" id="" className="block border-2 p-1 rounded-md w-full" required/>
            </div>
            <div>
            <label>Health Score :</label>
            <input type="number" name="" id="" className="block border-2 p-1 rounded-md w-full" required/>
            </div>
          </div>

          <div className="ingredients-form">
            
            <div className="ingredients-list flex justify-center mt-4">
              <fieldset className="bg-white border-2 w-full p-4">
                <legend className="text-sm ml-4">Ingredients List</legend>

                    <div className="grid lg:grid-cols-3 p-4 lg:justify-items-center gap-4 rounded-md relative">
                  <div className="w-full">
                    <label>Quantity :</label>
                    <input type="number" className="border-2 p-1 rounded-md block w-full " onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
                  </div>

                  <div className="w-full">
                    <label>Measurement  :</label>
                    <input type="text" className="border-2 p-1 rounded-md block w-full" onChange={(e) => setMeasurement(e.target.value)} value={measurement}/>
                    </div>
                    
                    <div className="w-full">
                    <label>Ingredient  :</label>
                    <input type="text" className="border-2 p-1 rounded-md block w-full" onChange={(e) => setIngredientName(e.target.value)} value={ingredientName}/>
                    </div>
                  </div>
                  <div className="w-full px-4  lg:flex lg:justify-end">
                    <div className="flex justify-center items-center bg-customPink text-white lg:pr-4 rounded-md "  onClick={addIngredients}>
                      <svg  className="w-[35px] h-[35px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier">  <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

                      <button type="button" className="">Add New Ingredient</button>
                    </div>
                  </div>


                    <div className="ingredient-lists my-10">
                      <div className="grid grid-cols-1 gap-2">
                    {ingredient.map((ingredients) => (
                      <div className="w-full flex items-center justify-between py-4 px-8 bg-[#FF6F6F]  rounded-md">
                        <h1 className="text-sm text-white">{ingredients}</h1>
                        <div className="trash" onClick={() => removeIngredient(ingredients)}>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20.5001 6H3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M9.5 11L10 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M14.5 11L14 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                        </div>
                      </div>
                    ))}
                    </div>

                    {!ingredient || ingredient.length === 0 && 
                    <div className="flex flex-col justify-center items-center">
                      <svg width="256px" height="256px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M341.333333 426.645333m-170.666666 0a170.666667 170.666667 0 1 0 341.333333 0 170.666667 170.666667 0 1 0-341.333333 0Z" fill="#FFB300"></path><path d="M362.666667 725.312m-170.666667 0a170.666667 170.666667 0 1 0 341.333333 0 170.666667 170.666667 0 1 0-341.333333 0Z" fill="#FFB300"></path><path d="M810.666667 551.936c0-131.562667-80.576-101.184-80.576-384.533333h-201.493334C528.597333 450.752 448 420.373333 448 551.936v313.728A30.293333 30.293333 0 0 0 478.229333 896h302.229334A30.293333 30.293333 0 0 0 810.666667 865.664V551.936z" fill="#90CAF9"></path><path d="M746.666667 160.021333C746.666667 177.685333 733.525333 192 717.333333 192h-176C525.141333 192 512 177.685333 512 160.021333v-21.333333C512 121.024 525.141333 106.666667 541.333333 106.666667h176C733.525333 106.666667 746.666667 121.024 746.666667 138.688v21.333333z" fill="#9C27B0"></path><path d="M770.368 825.173333a10.090667 10.090667 0 0 1-10.090667 10.133334H498.368a10.112 10.112 0 0 1-10.090667-10.133334V551.936c0-43.776 9.856-63.658667 24.768-93.781333 13.461333-27.136 28.608-58.026667 39.786667-108.629334h153.002667c11.157333 50.602667 26.325333 81.472 39.786666 108.629334 14.890667 30.101333 24.746667 50.005333 24.746667 93.781333V825.173333z" fill="#FAFAFA"></path><path d="M170.666667 554.688L213.333333 896h597.333334l42.666666-341.312H170.666667zM320 832h-42.666667v-85.333333h42.666667v85.333333z m0-128h-42.666667v-85.333333h42.666667v85.333333z m106.666667 128h-42.666667v-85.333333h42.666667v85.333333z m0-128h-42.666667v-85.333333h42.666667v85.333333z m106.666666 128h-42.666666v-85.333333h42.666666v85.333333z m0-128h-42.666666v-85.333333h42.666666v85.333333z m106.666667 128h-42.666667v-85.333333h42.666667v85.333333z m0-128h-42.666667v-85.333333h42.666667v85.333333z m106.666667 128h-42.666667v-85.333333h42.666667v85.333333z m0-128h-42.666667v-85.333333h42.666667v85.333333z" fill="#E91E63"></path><path d="M885.205333 512a21.333333 21.333333 0 0 0-21.333333-21.333333H160.128a21.333333 21.333333 0 0 0-21.333333 21.333333v42.688a21.333333 21.333333 0 0 0 21.333333 21.333333h703.744a21.333333 21.333333 0 0 0 21.333333-21.333333V512z" fill="#AD1457"></path><path d="M341.333333 331.306667s-21.333333-139.285333-192-117.952c42.666667 149.333333 192 117.952 192 117.952z" fill="#4CAF50"></path></g></svg>
                      <h1>Your Ingredients Will be Displayed Here</h1>
                      </div>}

                  </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
      <BottomNavbar />
    </>
  );
};

export default CreateRecipe;
