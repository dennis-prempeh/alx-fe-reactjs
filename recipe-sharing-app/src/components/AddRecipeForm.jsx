  import { useState } from 'react';
  import { useRecipeStore } from './recipeStore';

  const AddRecipeForm = () => {
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      addRecipe({ id: Date.now(), title, description });
      setTitle('');
      setDescription('');
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    );
  };

  export default AddRecipeForm;