import { BrowserRouter, Route, Routes } from "react-router-dom";

import NutritionistRegisterForms from "./components/NutritionistRegisterForms";
import NutritionistLoginForm from "./components/NutritionistLoginForm";
import Nutritionistpatients from "./components/Nutritionistpatients";
import { useUser } from "./context/nutritionistContext"; // Import your UserContext
import PatientsDetail from "./components/PatientsDetail";
import NewPatientRegisterForm from "./components/NewPatientRegisterForm";
import Protected from "./components/protected route/ProtectedRoute";
import Home from "./components/Home";

function App() {
  const { user } = useUser(); // Access user context
  console.log("user on app", user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/patientform"
          element={
            <Protected isLoggedIn={user}>
              <NewPatientRegisterForm nutriId={user?.nutriDataPatients.id} />
            </Protected>
          }
        />
        <Route
          path="/nutripatients"
          element={
            <Protected isLoggedIn={user}>
              <Nutritionistpatients DataPatient={user?.nutriDataPatients} />
            </Protected>
          }
        />

        <Route path="/Nutriregister" element={<NutritionistRegisterForms />} />
        <Route path="/Nutrilogin" element={<NutritionistLoginForm />} />

        {user &&
          user && ( // Check if user is logged in and user.id is available
            <Route
              path="/patientdetail/:patientId"
              element={<PatientsDetail nutriId={user.nutriDataPatients.id} />}
            />
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
