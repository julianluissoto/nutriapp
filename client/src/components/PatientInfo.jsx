import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import PageInfo from "./PatientRecipes";

function PatientInfo() {
  const { id } = useParams();
  const [patientInfo, setpatientInfo] = useState(null);
  const [foodPlanData, setFoodPlanData] = useState({});
  const [recipesData, setrecipesData] = useState({});

  const getPatientInfo = async () => {
    const info = await axios.get(`/patients/${id}`);
    const patient = info?.data.patient;
    setpatientInfo(patient[0]);
    if (patient[0].foodPlan === null) {
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
    setFoodPlanData(patient[0].foodPlan);
    setrecipesData(patient[0].recipes);
    console.log(patient[0].recipes);
  };

  useEffect(() => {
    getPatientInfo();
  }, []);

  return (
    <div className="w-3/4 m-auto">
      <LogOutButton />
      <div className="mt-8">
        <h2 className="text-cyan-500 text-xl font-semibold">
          Hola{" "}
          <strong className="text-cyan-800 text-xl font-semibold">
            {patientInfo?.name}
          </strong>{" "}
        </h2>
        <p className="text-cyan-800 font-semibold text-lg">
          tu numero de registro es: <strong>{patientInfo?.id}</strong>
        </p>
        <h3 className="text-center text-green-600 text-2xl font-semibold  mb-2">
          PLAN DE COMIDAS
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 ">
        {Object.keys(foodPlanData)?.map((day, index) => (
          <div
            key={index}
            className="bg-green-300 p-4 rounded-lg shadow-lg text-slate-800"
          >
            <h3 className="text-lg font-semibold">{day}</h3>
            <ul>
              {Object.keys(foodPlanData[day])?.map((meal, mealIndex) => (
                <li key={mealIndex}>
                  <strong className="text-slate-800">{meal}:</strong>{" "}
                  <p className="text-slate-600 font-semibold">
                    {foodPlanData[day][meal]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="text-center text-green-600 text-2xl font-semibold mt-2">
        RECETAS RECOMENDADAS
      </h3>
      <PageInfo recipes={recipesData} />
    </div>
  );
}

export default PatientInfo;
