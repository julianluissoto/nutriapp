import React, { useState } from "react";
import PropTypes from "prop-types";

function RenderRecipeCards({ recipes, handleEditRecipe }) {
  const [editedRecipes, setEditedRecipes] = useState({});
  const [isEditing, setIsEditing] = useState({});

  if (!recipes || Object.keys(recipes).length === 0) {
    return null;
  }

  const handleEdit = (recipeTitle) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [recipeTitle]: true,
    }));
    setEditedRecipes((prevEditedRecipes) => ({
      ...prevEditedRecipes,
      [recipeTitle]: { ...recipes[recipeTitle] },
    }));
  };

  const handleCancelEdit = (recipeTitle) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [recipeTitle]: false,
    }));
  };

  const handleSaveEdit = (recipeTitle) => {
    handleEditRecipe(
      recipeTitle,
      editedRecipes[recipeTitle].title,
      editedRecipes[recipeTitle].description
    );
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [recipeTitle]: false,
    }));
  };

  return Object.keys(recipes).map((recipeTitle, index) => {
    const recipe = recipes[recipeTitle];
    const recipeDescription = recipe.description;

    return (
      <div key={index} className="mt-4 bg-cyan-200 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Nombre: {recipeTitle}</h3>
        {isEditing[recipeTitle] ? (
          <input
            type="text"
            value={editedRecipes[recipeTitle].title}
            onChange={(e) =>
              setEditedRecipes((prevEditedRecipes) => ({
                ...prevEditedRecipes,
                [recipeTitle]: {
                  ...prevEditedRecipes[recipeTitle],
                  title: e.target.value,
                },
              }))
            }
          />
        ) : (
          <h3 className="text-lg font-semibold">
            Descripción: {recipeDescription}
          </h3>
        )}
        {isEditing[recipeTitle] ? (
          <textarea
            className="block mt-2 min-w-[350px] md:w-[600px]"
            rows={4}
            value={editedRecipes[recipeTitle].description}
            onChange={(e) =>
              setEditedRecipes((prevEditedRecipes) => ({
                ...prevEditedRecipes,
                [recipeTitle]: {
                  ...prevEditedRecipes[recipeTitle],
                  description: e.target.value,
                },
              }))
            }
          />
        ) : null}
        {isEditing[recipeTitle] ? (
          <>
            <button
              onClick={() => handleSaveEdit(recipeTitle)}
              className="bg-cyan-800 text-white px-4 py-2 ml-2 rounded-md"
            >
              Guardar Edición
            </button>
            <button
              onClick={() => handleCancelEdit(recipeTitle)}
              className="bg-red-800 text-white px-4 py-2 ml-2 rounded-md"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => handleEdit(recipeTitle)}
            className="bg-cyan-800 text-white px-4 py-2 ml-2 rounded-md"
          >
            Editar
          </button>
        )}
      </div>
    );
  });
}

RenderRecipeCards.propTypes = {
  recipes: PropTypes.object.isRequired, // Use the appropriate shape for your recipes data
  handleEditRecipe: PropTypes.func.isRequired,
};

export default RenderRecipeCards;
