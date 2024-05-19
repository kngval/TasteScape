import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import SignUp from "./auth/SignUp";

function App() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={userInfo ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={userInfo ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={userInfo ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-recipes"
            element={userInfo ? <MyRecipes /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-recipes/:id"
            element={
              userInfo ? <CreatedRecipeDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/my-recipes/createRecipe"
            element={userInfo ? <CreateRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={userInfo ? <LikedRecipes /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={userInfo ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/edit-profile"
            element={userInfo ? <EditProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/:id"
            element={userInfo ? <RecipeDetails /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
