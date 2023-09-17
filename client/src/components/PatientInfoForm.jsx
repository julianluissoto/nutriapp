import { useState } from "react";
import axios from "axios";

const PatientInfoForm = ({ id, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    food_plan: "",
    tips: "",
    recipes: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the additional patient information to the server
      await axios.put(`http://localhost:3000/patient/${id}`, {
        food_plan: JSON.stringify(formData.food_plan),
        tips: formData.tips,
        recipies: JSON.stringify(formData.recipes),
      });
      // Notify the parent component that the form was successfully submitted
      onFormSubmit();
    } catch (error) {
      console.error("Error submitting patient information:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="food_plan" className="block font-semibold">
          Food Plan:
        </label>
        <textarea
          id="food_plan"
          name="food_plan"
          value={formData.food_plan}
          onChange={handleChange}
          rows="4"
          //required
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="tips" className="block font-semibold">
          Tips:
        </label>
        <textarea
          id="tips"
          name="tips"
          value={formData.tips}
          onChange={handleChange}
          rows="4"
          // required
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="recipes" className="block font-semibold">
          Recipes:
        </label>
        <textarea
          id="recipes"
          name="recipes"
          value={formData.recipes}
          onChange={handleChange}
          rows="4"
          //required
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      >
        Submit
      </button>
    </form>
  );
};

export default PatientInfoForm;
