import "./App.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import { Home } from "./components/Home/Home";
import { RecipeDetail } from "./components/RecipeDetail/RecipeDetail";
import Form from "./components/Form/Form";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/api/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
