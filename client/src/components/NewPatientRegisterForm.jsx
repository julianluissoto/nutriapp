import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function NewPatientRegisterForm({ nutriId }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formateddata = {
      ...data,
      nutritionist_Id: nutriId,
    };

    try {
      const result = await axios.post("/patients", formateddata);

      if (result.statusText === "OK")
        Swal.fire("Perfecto!", "Paciente agregado correctamente", "success");
      reset();
      navigate("/nutripatients");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl mb-4 text-blue-400">
        Formulario de Nuevo Paciente
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Nombre del paciente"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">First Name is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apellido:
          </label>
          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Apellido del paciente"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">Last Name is required</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="email del paciente"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">email is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Edad
          </label>
          <Controller
            name="age"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Edad"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">Age is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Peso (kg):
          </label>
          <Controller
            name="weight"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Peso (kg)"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">Weight is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Altura (m):
          </label>
          <Controller
            name="height"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Altura (m)"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">Height is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="objective"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Objetivo del tratamiento:
          </label>
          <Controller
            name="objective"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Objetivo"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.objective && (
            <p className="text-red-500 text-xs mt-1">Objective is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dni"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            DNI:
          </label>
          <Controller
            name="dni"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="DNI"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.dni && (
            <p className="text-red-500 text-xs mt-1">DNI is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Localidad:
          </label>
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Localidad"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">Location is required</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            Agregar Paciente
          </button>
        </div>
      </form>
    </div>
  );
}
