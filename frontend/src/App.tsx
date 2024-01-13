import  { BrowserRouter, Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import MyRecipes from "./pages/MyRecipes"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home />}/>
            <Route path="/MyRecipes" element={<MyRecipes />}/>

          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
