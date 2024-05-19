import { useState } from "react";
import Navbar from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.userInfo?.token);
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

  const handleFileChangeCover = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setCover(reader.result);
          console.log(reader.result);
        }
      };
    }
  };
  const clearAllFields = () => {
    setImage(null);
    setCover(null);
    setName("");
  };

  const submitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const pfp = {
        image,
        name,
        cover,
      };
      console.log("INITIAL STATE: ",pfp)
      const response = await axios.patch(
        "http://localhost:3000/profile/edit-profile",
        pfp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        navigate("/profile");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <form
          onSubmit={submitProfile}
          className="grid gap-5 my-[3rem] sm:bg-white sm:border-2  sm:p-8 lg:w-[1000px]"
        >
          <div className="flex flex-col items-center justify-center">
            <div
              aria-required
              onClick={() =>
                document.getElementById("pfp-image-input")?.click()
              }
              className={`rounded-full ${
                !image ? "border-2 " : "border-none"
              } w-[200px] h-[200px] flex justify-center items-center object-center`}
            >
              <input
                id="pfp-image-input"
                type="file"
                onChange={(e) => handleFileChange(e)}
                className="hidden"
                accept="image/*"
                name="pfp-image"
              />
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-center object-cover rounded-full"
                />
              ) : (
                <svg
                  className="w-[50px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M4 12H20M12 4V20"
                      stroke="#808080"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </div>
            <label className="mt-4" htmlFor="">
              Profile Picture
            </label>
          </div>

          <div className="flex flex-col  items-center justify-center">
            <div className="w-full sm:w-[500px]">
              <label className="text-xs">Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="block border-2 px-4 py-2 rounded-xl w-full outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="coverphoto grid justify-items-center">
            <label htmlFor="">Cover Photo </label>

            <div
              onClick={() => document.getElementById("cp")?.click()}
              className={`w-full h-[200px] sm:w-[500px] sm:h-[300px] ${
                !cover ? "border-2 rounded-xl" : "border-none"
              }`}
            >
              <input
                id="cp"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChangeCover(e)}
                required
              />
              {cover ? (
                <img src={cover} alt="" className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
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
                </div>
              )}
            </div>
          </div>
          <div className="grid justify-items-center gap-2">
            <button
              type="submit"
              className="bg-customPink text-white py-2 w-[50%] rounded-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="py-2 border-2 w-[50%] rounded-lg"
              onClick={clearAllFields}
            >
              Clear All Fields
            </button>
          </div>
        </form>
      </div>
      <BottomNavbar />
    </>
  );
};

export default EditProfile;
