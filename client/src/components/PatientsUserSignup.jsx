import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PatientSignupForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/user/signup", data);

      if (result.statusText === "OK") {
        Swal.fire("Perfecto!", "Paciente registrado correctamente", "success");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl mb-4 text-blue-400">
        Formulario de Nuevo Usuario
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
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
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">Nombre es requerido</p>
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
            <p className="text-red-500 text-xs mt-1">Apellido es requerido</p>
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
                placeholder="Email del paciente"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">Email es requerido</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña:
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="flex items-center">
                <input
                  {...field}
                  type={"password"}
                  placeholder="Contraseña"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">Contraseña es requerida</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="passwordConfirmation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirmar Contraseña:
          </label>
          <Controller
            name="passwordConfirmation"
            control={control}
            rules={{
              required: "Confirmación de contraseña es requerida",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Confirmar Contraseña"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-xs mt-1">
              {errors.passwordConfirmation.message}
            </p>
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
