import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import LikedRecipes from "./pages/LikedRecipes";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<LikedRecipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
