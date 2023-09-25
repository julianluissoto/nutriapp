import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./BackButton";
import Swal from "sweetalert2";
import RenderRecipeCards from "./Recipes";

function PatientsDetail({ nutriId }) {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [foodPlanData, setFoodPlanData] = useState({});
  const [recipes, setRecipes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeDescription, setNewRecipeDescription] = useState("");
  const [addingRecipe, setAddingRecipe] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/patients?nutritionistId=${nutriId}&patientId=${patientId}`
      );
      setPatientData(response.data.patient);

      // Check if foodPlan is defined, and if not, set it as an empty object
      if (response.data.patient.foodPlan === null) {
        return setFoodPlanData({
          "Dia 1": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 2": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 3": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 4": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 5": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 6": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
          "Dia 7": {
            desayuno: "",
            media_mañana: "",
            almuerzo: "",
            media_tarde: "",
            merienda: "",
            cena: "",
          },
        });
      }
      setFoodPlanData(response.data.patient.foodPlan);
      setRecipes(response.data?.patient.recipes);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleAddRecipe = () => {
    setAddingRecipe(true); // Set addingRecipe to true to display the input
  };

  const handleSubmitRecipe = async () => {
    // Create a new recipe object with title and description
    const newRecipe = {
      title: newRecipeTitle,
      description: newRecipeDescription,
    };

    try {
      // Send the updated recipes to the server
      await axios.put(`/patient/${patientId}`, {
        recipes: {
          ...recipes, // Existing recipes
          [newRecipeTitle]: newRecipe, // Add the new recipe with a unique key
        },
      });

      Swal.fire("Receta agregada correctamente");

      // Update the state to include the new recipe
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        [newRecipeTitle]: newRecipe, // Add the new recipe to the state
      }));

      // Clear the new recipe title and description inputs
      setNewRecipeTitle("");
      setNewRecipeDescription("");
      setAddingRecipe(false); // Set addingRecipe back to false
    } catch (error) {
      console.error("Error updating recipes:", error);
    }
  };

  const handleInputChange = (day, meal, value) => {
    setFoodPlanData((prevData) => ({
      ...prevData,
      [day]: {
        ...(prevData[day] || {}),
        [meal]: value,
      },
    }));
  };

  const handleSaveFoodPlan = async () => {
    try {
      await axios.put(`/patient/${patientId}`, {
        foodPlan: foodPlanData,
      });
      Swal.fire("Plan de comidas actualizado");

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating food plan:", error);
    }
  };

  const handleEditRecipe = async (
    recipeTitle,
    updatedTitle,
    updatedDescription
  ) => {
    // Create a new recipe object with updated title and description
    const updatedRecipe = {
      title: updatedTitle,
      description: updatedDescription,
    };

    try {
      // Send the updated recipes to the server
      await axios.put(`/patient/${patientId}`, {
        recipes: {
          ...recipes, // Existing recipes
          [recipeTitle]: updatedRecipe, // Update the existing recipe with the modified details
        },
      });

      Swal.fire("Receta actualizada correctamente");

      // Update the state to include the updated recipe
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        [recipeTitle]: updatedRecipe, // Update the recipe in the state
      }));
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [nutriId, patientId]);

  return (
    <div className="bg-cyan-100 p-4 rounded-lg shadow-lg">
      <BackButton />
      {patientData ? (
        <>
          <h1 className="text-3xl font-semibold text-cyan-800 mb-4">
            {patientData.name} {patientData.lastname}
          </h1>

          <h2 className="text-xl font-semibold mt-6 text-cyan-800">
            Plan de comidas
          </h2>
          {isEditing ? (
            <button
              onClick={handleSaveFoodPlan}
              className="bg-cyan-800 text-white px-4 py-2 mt-4 rounded-md mb-2 "
            >
              Guardar Plan
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-800 text-white px-4 py-2 mt-4 rounded-md mb-2"
            >
              Editar Plan
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(foodPlanData)?.map((day, index) => (
              <div
                key={index}
                className="bg-cyan-200 p-4 rounded-lg shadow-lg text-slate-800"
              >
                <h3 className="text-lg font-semibold">{day}</h3>
                <ul>
                  {Object.keys(foodPlanData[day])?.map((meal, mealIndex) => (
                    <li key={mealIndex}>
                      <strong className="text-slate-800">{meal}:</strong>{" "}
                      {isEditing ? (
                        <textarea
                          className="w-full rounded-md p-1"
                          value={
                            (foodPlanData[day] && foodPlanData[day][meal]) || ""
                          }
                          onChange={(e) =>
                            handleInputChange(day, meal, e.target.value)
                          }
                        />
                      ) : (
                        (foodPlanData[day] && foodPlanData[day][meal]) || ""
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-cyan-800">Loading...</p>
      )}
      <h4 className="text-2xl font-semibold mt-6 text-center text-cyan-800">
        RECETAS SALUDABLES
      </h4>

      {addingRecipe ? (
        // Render the input for adding a new recipe
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter recipe title"
            value={newRecipeTitle}
            onChange={(e) => setNewRecipeTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter recipe description"
            value={newRecipeDescription}
            onChange={(e) => setNewRecipeDescription(e.target.value)}
          />
          <button
            onClick={handleSubmitRecipe}
            className="bg-cyan-800 text-white px-4 py-2 ml-2 rounded-md"
          >
            Guardar receta
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddRecipe}
          className="bg-cyan-800 text-white px-4 py-2 mt-4 rounded-md"
        >
          Agregar receta
        </button>
      )}
      <RenderRecipeCards
        recipes={recipes}
        handleEditRecipe={handleEditRecipe}
      />
    </div>
  );
}

export default PatientsDetail;
