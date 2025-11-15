import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecipeStore } from "./recipeStore";
import DeleteRecipeButton from "./DeleteRecipeButton";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const [query, setQuery] = useState(searchTerm || "");

  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      filterRecipes();
    }
  }, [recipes, searchTerm, filterRecipes]);

  const listToShow =
    searchTerm && searchTerm.length > 0 ? filteredRecipes : recipes;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Recipes</h2>

      {/* Search bar */}
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <input
          type="search"
          placeholder="Search recipes by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => {
            setQuery("");
            setSearchTerm("");
          }}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {listToShow.length === 0 ? (
        <p>No recipes match your search. Add one to get started!</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {listToShow.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "4px",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{ color: "#0066cc", textDecoration: "none" }}
                >
                  View Details
                </Link>
                <DeleteRecipeButton id={recipe.id} />
                {favorites && favorites.includes(recipe.id) ? (
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    ★ Favorited
                  </button>
                ) : (
                  <button
                    onClick={() => addFavorite(recipe.id)}
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    ☆ Add Favorite
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
