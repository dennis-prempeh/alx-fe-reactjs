import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Recommended Recipes</h2>
      <button
        onClick={generateRecommendations}
        style={{ padding: "0.4rem 0.6rem", marginBottom: "0.5rem" }}
      >
        Generate
      </button>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Click "Generate" to get suggestions.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {recommendations.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #eee",
                padding: "0.75rem",
                borderRadius: "6px",
              }}
            >
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <Link
                to={`/recipe/${r.id}`}
                style={{ color: "#0066cc", textDecoration: "none" }}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;
