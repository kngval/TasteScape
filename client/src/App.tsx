import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import LikedRecipes from "./pages/LikedRecipes";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails";
import Search from "./pages/Search";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./auth/Login";
import CreatedRecipeDetails from "./pages/CreatedRecipeDetails";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import EditProfile from "./pages/EditProfile";


function App() {
  const userInfo = useSelector((state:RootState) => state.auth.userInfo);
  
 
    return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={!userInfo ? <Login /> : <Home />}/>
          <Route path="/home" element={userInfo ? <Home /> : <Login />} />
          <Route path="/search" element={userInfo ? <Search /> : <Login />} />
          <Route path="/search" element={userInfo ? <Search /> : <Login />} />
          <Route path="/my-recipes" element={userInfo ? <MyRecipes /> : <Login />} />
          <Route path="/my-recipes/:id" element={ userInfo ? <CreatedRecipeDetails /> : <Login />} />
          <Route path="/my-recipes/createRecipe" element={userInfo ? <CreateRecipe /> : <Login />}/>
          <Route path="/favorites" element={ userInfo ? <LikedRecipes /> : <Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit-profile" element={userInfo ? <EditProfile /> : <Login/>} />
          <Route path="/recipe/:id" element={ userInfo ? <RecipeDetails /> : <Login />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
