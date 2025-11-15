import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // Actions
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (id, updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe)
  })),
  setRecipes: (recipes) => set({ recipes }),

  setSearchTerm: (term) => set(state => ({
    searchTerm: term,
    filteredRecipes: state.recipes.filter(r => (r.title || '').toLowerCase().includes((term || '').toLowerCase()))
  })),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(r => (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase()))
  })),

  // Favorites actions
  addFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.includes(recipeId) ? state.favorites : [...state.favorites, recipeId]
  })),

  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // Simple recommendations generator (mock implementation)
  generateRecommendations: () => set(state => {
    // Basic mock: recommend recipes that are not yet favorited but share words with favorited recipes' titles
    const favRecipes = state.recipes.filter(r => state.favorites.includes(r.id));
    const favWords = new Set(favRecipes.flatMap(r => (r.title || '').toLowerCase().split(/\s+/)));
    const recommended = state.recipes
      .filter(r => !state.favorites.includes(r.id))
      .filter(r => (r.title || '').toLowerCase().split(/\s+/).some(w => favWords.has(w)))
      .slice(0, 10);
    return { recommendations: recommended };
  }),

}));
