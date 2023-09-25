import axios from "axios";
import { useEffect, useState } from "react";
import LogOutButton from "./LogOutButton";

function UserNutriPlan({ userEmail }) {
  const [userData, setuserdata] = useState([]);
  const [foodPlan, setFoodPlan] = useState([]);
  const [recipies, setRecipies] = useState([]);

  const userDataRequest = async () => {
    const userpatientData = await axios.get(`nutriplan/${userEmail}`);
    setuserdata(userpatientData?.data.patient[0]);
    const foodPlanArray = Object.entries(
      userpatientData?.data.patient[0].foodPlan
    );

    setFoodPlan(foodPlanArray);
    setRecipies(userpatientData?.data.patient[0].recipes);
  };
  const mealOrder = ["breakfast", "lunch", "dinner"];

  useEffect(() => {
    userDataRequest();
  }, []);

  return (
    <section className="w-3/4 m-auto ">
      <div>
        <LogOutButton />
        <h3 className="text-lg text-cyan-500 text-left ml-2">
          Bienvenida: <strong>{userData?.lastname}</strong>, {userData?.name}
        </h3>
        <p>
          Objetivo del Plan:{" "}
          <strong>{userData?.objective?.toUpperCase()}</strong>
        </p>
      </div>
      <div>
        <p className="text-2xl text-cyan-600 text-center font-semibold">
          Plan de alimentacion
        </p>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodPlan.map(([day, meals], index) => (
            <div
              key={index}
              className="bg-cyan-200 p-4 rounded-lg shadow-lg  text-slate-800 "
            >
              <h3 className="text-lg font-semibold">{day}</h3>
              <ul>
                {Object.keys(meals).map((meal, mealIndex) => (
                  <li key={mealIndex}>
                    <strong className="text-slate-800">{meal}:</strong>{" "}
                    {meals[meal]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
        <article>
          <h4 className="text-xl text-center text-slate-900">
            RECETAS SALUDABLES RECOMENDADAS
          </h4>
          <div>
            {mealOrder.map((meal, index) => (
              <div
                key={index}
                className="bg-cyan-200 p-4 rounded-lg shadow-lg text-slate-800"
              >
                <h3 className="text-lg font-semibold">{meal}</h3>
                <p>{recipies[meal]}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default UserNutriPlan;
