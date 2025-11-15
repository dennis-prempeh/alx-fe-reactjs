import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const favoriteRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{ marginTop: "1rem" }}>
        <h2>My Favorites</h2>
        <p>No favorites yet. Add some recipes to your favorites.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>My Favorites</h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #eee",
              padding: "0.75rem",
              borderRadius: "6px",
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ color: "#0066cc", textDecoration: "none" }}
              >
                View
              </Link>
              <button
                onClick={() => removeFavorite(recipe.id)}
                style={{ padding: "0.25rem 0.5rem" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
