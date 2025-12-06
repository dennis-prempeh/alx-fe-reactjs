import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import recipesData from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const rid = parseInt(id, 10);
    const found = recipesData.find((r) => r.id === rid);
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">Recipe not found</h2>
          <p className="text-slate-600">
            We couldn't find a recipe with that ID.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex md:items-start">
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-extrabold mb-2">{recipe.title}</h1>
            {recipe.summary && (
              <p className="text-slate-600 mb-4">{recipe.summary}</p>
            )}

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">
                    No ingredient list available.
                  </p>
                )}
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  <ol className="list-decimal list-inside text-slate-700 space-y-2">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-slate-500">No instructions provided.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

