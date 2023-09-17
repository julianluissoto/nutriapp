import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PatientsDetail({ nutriId }) {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [foodPlanData, setFoodPlanData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patient?nutritionistId=${nutriId}&patientId=${patientId}`
      );
      setPatientData(response.data.patient);

      if (response.data.patient.foodPlan) {
        setFoodPlanData(response.data.patient.foodPlan);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
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
      const response = await axios.put(
        `http://localhost:3000/patient/${patientId}`,
        {
          foodPlan: foodPlanData,
        }
      );
      console.log(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating food plan:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [nutriId, patientId]);

  return (
    <div className="bg-cyan-100 p-4 rounded-lg shadow-lg">
      {patientData ? (
        <>
          {/* ... patient data rendering ... */}
          <h2 className="text-xl font-semibold mt-6 text-cyan-800">
            Plan de comidas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(foodPlanData).map((day, index) => (
              <div
                key={index}
                className="bg-cyan-200 p-4 rounded-lg shadow-lg text-slate-800"
              >
                <h3 className="text-lg font-semibold">{day}</h3>
                <ul>
                  {Object.keys(foodPlanData[day]).map((meal, mealIndex) => (
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

          {/* ... save and edit buttons ... */}
        </>
      ) : (
        <p className="text-cyan-800">Loading...</p>
      )}
    </div>
  );
}

export default PatientsDetail;
