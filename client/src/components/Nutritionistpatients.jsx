import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./Nutritionistpatients.css"; // Import the CSS file

import BackButton from "./BackButton";
import LogOutButton from "./LogOutButton";
import axios from "axios";

import Loader from "./Loader/Loader";

export default function Nutritionistpatients({ DataPatient }) {
  const { name, id } = DataPatient;
  const [tipsInput, setTipsInput] = useState({});
  const [patientData, setPatientData] = useState([]);
  const [filteredPatient, setFilteredPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const nutriPatientsData = async () => {
    try {
      setLoading(true);
      const dataresponse = await axios.get(`nutripatients/${id}`);
      const patientsWithTips = dataresponse.data.patients;

      // Initialize tipsInput with tips from the database
      const tipsInputObj = {};
      patientsWithTips.forEach((patient) => {
        tipsInputObj[patient.id] = patient.tips || ""; // Use the tips from the database, or an empty string if not available
      });

      setPatientData(patientsWithTips);
      setTipsInput(tipsInputObj);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTipsChange = (patientId, tips) => {
    setTipsInput({ ...tipsInput, [patientId]: tips });
  };

  const handleSearch = (e) => {
    const patientDni = e.target.value;

    const filterPatient = patientData.filter((p) =>
      p.dni.toString().includes(patientDni)
    );
    setFilteredPatient(filterPatient);
  };

  const updateTipsOnServer = async (patientId, updatedTips) => {
    try {
      const response = await axios.put(`/patient/${patientId}`, {
        tips: updatedTips,
      });

      if (response.status === 200) {
        setPatientData((prevData) =>
          prevData.map((patient) =>
            patient.id === patientId
              ? { ...patient, tips: updatedTips }
              : patient
          )
        );

        // Set updateSuccess to true to display a success message
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.error("Error updating tips:", error);
    }
  };

  const handleSubmitTip = (patientId) => {
    // Get the tips from the tipsInput state
    const updatedTips = tipsInput[patientId];

    // Call the function to send the updated tips to the server
    updateTipsOnServer(patientId, updatedTips);
    setTipsInput("");
  };

  useEffect(() => {
    nutriPatientsData();
  }, [DataPatient]);

  return (
    <div className="bg-green-200 p-4 rounded-md w-full h-screen m-auto">
      <BackButton />
      <LogOutButton />
      <h2 className="text-slate-500 mb-4 font-semibold">
        Bienvenida{" "}
        <strong className="text-lg text-slate-950">{name.toUpperCase()}</strong>
      </h2>
      <Link to={"/patientform"}>
        <button className="bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          REGISTRAR NUEVO PACIENTE
        </button>
      </Link>
      <div className="">
        <label
          htmlFor="search"
          className="text-lg font-semibold text-green-800 "
        >
          Buscar Paciente
          <input
            id="search"
            type="number"
            onChange={(e) => handleSearch(e)}
            placeholder="Ingrese Dni"
            className="block border border-lime-700 rounded-md mb-2"
          />
        </label>
      </div>

      <h3 className="text-lg font-semibold">PACIENTES</h3>
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredPatient?.length === 0 ? (
          <p className="text-red-700 text-center text-2xl font-semibold">
            No se encontraron pacientes.
          </p>
        ) : (
          (filteredPatient || patientData)?.map((patient) => (
            <div className="bg-cyan-400 rounded-md p-2" key={patient.dni}>
              <div className="bg-cyan-400 rounded-md p-2" key={patient.dni}>
                <p>{patient.patient_id}</p>
                <p>
                  Nombre: <strong>{patient.name}</strong>
                </p>
                <p>
                  Apellido: <strong>{patient.lastname}</strong>{" "}
                </p>
                <p>
                  Id: <strong>{patient.id}</strong>
                </p>
                <p>
                  Primera consulta{" "}
                  <strong>
                    {new Date(patient.first_consult).toLocaleDateString()}{" "}
                  </strong>
                </p>
                <p>
                  Edad: <strong>{patient.age}</strong>{" "}
                </p>
                <p>
                  Peso inicial:<strong>{patient.weight}</strong>{" "}
                </p>
                <p>
                  Altura: <strong>{patient.height}</strong>{" "}
                </p>
                <p>
                  Objetivo del tratamiento: <strong>{patient.objective}</strong>
                </p>
                <p className="text-slate-200 font-semibold ">
                  Tips: {patient?.tips}
                </p>

                <textarea
                  rows="3"
                  className="w-full mt-2 p-1 border rounded"
                  placeholder="Ingrese tips de comidas"
                  value={tipsInput[patient.id]}
                  onChange={(e) => handleTipsChange(patient.id, e.target.value)}
                />
                <div>
                  <button
                    onClick={() => handleSubmitTip(patient.id)}
                    className="bg-green-400 mt-2 font-medium hover:border hover:border-solid hover:text-slate-100 hover:bg-green-600 text-slate-800 py-2 px-4 rounded-lg focus:outline-none focus:ring"
                  >
                    Enviar Tip
                  </button>
                </div>
                {updateSuccess && (
                  <p className="text-green-600 font-semibold mt-2">
                    Tips updated successfully!
                  </p>
                )}
                <div>
                  <button
                    onClick={() => navigate(`/patientdetail/${patient.id}`)}
                    className="bg-blue-300 mt-4 font-medium hover:bg-blue-600 text-slate-800 py-2 px-4 rounded-lg focus:outline-none focus:ring"
                  >
                    MAS
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
