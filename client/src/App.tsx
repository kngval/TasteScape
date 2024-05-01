import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import LikedRecipes from "./pages/LikedRecipes";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails";
import Search from "./pages/Search";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./auth/Login";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/my-recipes/createRecipe" element={<CreateRecipe />}/>
          <Route path="/favorites" element={<LikedRecipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
