import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
