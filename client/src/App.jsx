import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NutritionistRegisterForms from "./components/NutritionistRegisterForms";
import NutritionistLoginForm from "./components/NutritionistLoginForm";
import Nutritionistpatients from "./components/Nutritionistpatients";
import { useUser } from "./context/nutritionistContext"; // Import your UserContext
import PatientsDetail from "./components/PatientsDetail";
import NewPatientRegisterForm from "./components/NewPatientRegisterForm";
import Protected from "./components/protected route/ProtectedRoute";
import Home from "./components/Home";
import PatientLogin from "./components/PatientsUserLogin";

import UserNutriPlan from "./components/UserNutriPlan";
import HomeButton from "./components/HomeButton";

import PatientInfo from "./components/PatientInfo";

function App() {
  const { user } = useUser(); // Access user context

  return (
    <BrowserRouter>
      <HomeButton />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user/signup" element={<PatientSignupForm />} /> */}
        <Route
          path="/patientform"
          element={
            <Protected isLoggedIn={user}>
              <NewPatientRegisterForm nutriId={user?.nutriDataPatients?.id} />
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
        <Route path="/Nutrisignup" element={<NutritionistRegisterForms />} />
        <Route path="/user/login" element={<PatientLogin />} />
        <Route path="/user/nutriplan/:id" element={<PatientInfo />} />

        {user && (
          <Route
            path="/nutriplan"
            element={<UserNutriPlan userEmail={user?.patientsLogged?.email} />}
          />
        )}
        {user &&
          user && ( // Check if user is logged in and user.id is available
            <Route
              path="/patientdetail/:patientId"
              element={<PatientsDetail nutriId={user?.nutriDataPatients?.id} />}
            />
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
