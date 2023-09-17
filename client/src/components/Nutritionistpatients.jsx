import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./Nutritionistpatients.css"; // Importa el archivo CSS

const Nutritionistpatients = ({ DataPatient }) => {
  const { name, patients } = DataPatient;
  console.log(DataPatient);
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 p-4 rounded-md w-full h-screen m-auto">
      <h2 className="text-slate-500 mb-4 font-semibold">
        Bienvenida{" "}
        <strong className="text-lg text-slate-950">{name.toUpperCase()}</strong>
      </h2>
      <h3 className="text-lg font-semibold">PACIENTES</h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
        {patients?.map((patient) => (
          <div className="bg-cyan-400 rounded-md p-2 " key={patient.dni}>
            <p>{patient.patient_id}</p>
            <p>
              Nombre: <strong>{patient.name}</strong>
            </p>
            <p>Apellido: {patient.lastname}</p>
            <p>Edad: {patient.age}</p>
            <p>Peso inicial: {patient.weight}</p>
            <p>Altura: {patient.height}</p>
            <p>
              Objetivo del tratamiento: <strong>{patient.objective}</strong>
            </p>
            <p>Tips: {patient?.tips}</p>
            <div>
              <button
                onClick={() => navigate(`/patientdetail/${patient.id}`)}
                className="bg-blue-300 mt-4 font-medium hover:bg-blue-600 text-slate-800 py-2 px-4 rounded-lg focus:outline-none focus:ring "
              >
                MAS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Nutritionistpatients.propTypes = {
  id: PropTypes.number,
};

export default Nutritionistpatients;
