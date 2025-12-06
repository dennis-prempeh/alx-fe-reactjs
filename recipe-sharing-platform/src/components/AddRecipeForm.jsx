import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function parseList(text) {
    return text
      .split(/\r?\n|,/) // split on newlines or commas
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Title is required.";

    const ings = parseList(ingredientsText);
    if (ings.length < 2)
      next.ingredients =
        "Please provide at least two ingredients (separate by newline or comma).";

    const steps = parseList(stepsText);
    if (steps.length < 1) next.steps = "Please provide preparation steps.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      summary: "",
      image: "https://via.placeholder.com/400x300",
      ingredients: parseList(ingredientsText),
      instructions: parseList(stepsText),
    };

    // For now just log the new recipe and show a success message.
    // Integrating into app-level state or saving to persistent storage can be added later.
    // eslint-disable-next-line no-console
    console.log("New recipe created:", newRecipe);
    setSubmitted(true);
    setTitle("");
    setIngredientsText("");
    setStepsText("");
    setErrors({});

    // Optional: navigate back to home after a short delay
    setTimeout(() => navigate("/"), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

        {submitted && (
          <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-100 p-3 text-emerald-700">
            Recipe submitted (demo). Returning to home...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                errors.title ? "border-rose-400" : "border-slate-200"
              }`}
              placeholder="e.g. Creamy Tomato Pasta"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-rose-500">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ingredients
            </label>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                errors.ingredients ? "border-rose-400" : "border-slate-200"
              }`}
              placeholder={
                "One ingredient per line, or comma separated\nExample:\n200g spaghetti\n100g pancetta"
              }
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-rose-500">{errors.ingredients}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Preparation Steps
            </label>
            <textarea
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              rows={6}
              className={`w-full px-3 py-2 border rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                errors.steps ? "border-rose-400" : "border-slate-200"
              }`}
              placeholder={
                "Write each step on its own line\nExample:\nBoil the pasta.\nFry the pancetta."
              }
            />
            {errors.steps && (
              <p className="mt-1 text-sm text-rose-500">{errors.steps}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-md font-semibold hover:bg-amber-700 transition-colors duration-150"
            >
              Submit Recipe
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle("");
                setIngredientsText("");
                setStepsText("");
                setErrors({});
              }}
              className="px-3 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
