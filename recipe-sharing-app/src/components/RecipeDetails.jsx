import { useParams, Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Recipe not found</h2>
        <Link to="/">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <Link
        to="/"
        style={{
          color: "#0066cc",
          textDecoration: "none",
          marginBottom: "1rem",
          display: "block",
        }}
      >
        ← Back to Recipes
      </Link>
      <h1>{recipe.title}</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        {recipe.description}
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <DeleteRecipeButton id={recipe.id} />
      </div>

      <h2>Edit Recipe</h2>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
