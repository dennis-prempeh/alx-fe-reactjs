import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <h1>Recipe Sharing App</h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 320px",
                    gap: "1rem",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <AddRecipeForm />
                    <RecipeList />
                  </div>
                  <aside>
                    <SearchBar />
                    <FavoritesList />
                    <RecommendationsList />
                  </aside>
                </div>
              </div>
            </>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
