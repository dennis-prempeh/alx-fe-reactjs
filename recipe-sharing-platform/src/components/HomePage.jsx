import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import recipesData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipes into state when the component mounts
    setRecipes(recipesData);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Recipe Sharing Platform
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse a collection of delicious recipes to get inspired in the
            kitchen. Each recipe is carefully curated to bring great flavors to
            your table.
          </p>
          <div className="mt-6">
            <Link
              to="/add"
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md font-semibold hover:bg-amber-700 transition-colors duration-150"
            >
              Add Recipe
            </Link>
          </div>
        </header>

        {/* Recipe Grid Section */}
        <section className="mb-8">
          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                No recipes available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
              {recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-slate-300 cursor-pointer group"
                >
                  {/* Recipe Image Container */}
                  {recipe.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
                      {recipe.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-slate-600 flex-1 line-clamp-3 mb-4">
                      {recipe.summary}
                    </p>

                    {/* Action Button */}
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="mt-auto inline-block px-4 py-2 bg-amber-50 text-amber-700 font-semibold rounded-md hover:bg-amber-100 transition-colors duration-200 border border-amber-200 hover:border-amber-300 text-center"
                    >
                      View Recipe
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer Info */}
        <footer className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Showing {recipes.length}{" "}
            {recipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
