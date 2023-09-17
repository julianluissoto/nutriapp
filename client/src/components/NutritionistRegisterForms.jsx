import { useState } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NutritionistRegisterForms = () => {
  const initialFormData = {
    user_id: "",
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    location: "",
  };

  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const [emailError, setEmailError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordNoMatch, setPasswordNoMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check email format when changing the email field
    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setEmailError(!emailPattern.test(value));
    }
    if (name === "password") {
      // Password validation logic here
      const isStrongPassword =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?=.*[a-zA-Z]).{8,}$/.test(value);
      setPasswordError(!isStrongPassword);
    }
    setFormData({ ...formData, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordNoMatch(true);
      return;
    }

    // Additional validation logic can be added here as needed

    try {
      // Send registration data to the server
      const response = await axios.post(
        "http://localhost:3000/nutritionist",
        formData
      );
      if (response.statusText === "OK")
        Swal.fire("Perfecto!", "Nueva Nutricionista creada", "success");
      setFormData(initialFormData);
      navigate("/");

      // Handle success or display an appropriate message
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      // Handle registration error (e.g., duplicate email, server error)
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-blue-300 p-4 rounded-md first:max-w-lg m-auto">
      <h2 className="text-white mb-4 font-semibold">
        Registro de nuevo Nutricionista
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.name}
          required
          className="bg-white rounded-md p-2 mb-2"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastname}
          required
          className="bg-white rounded-md p-2 mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className={`bg-white rounded-md p-2 mb-2 ${
            emailError ? "border-red-500" : ""
          }`}
        />
        {emailError && (
          <p className="text-red-500 text-xs">Invalid email format</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={formData.password}
            required
            className="bg-white rounded-md p-2 mb-2 w-full"
          />
          <button
            type="button"
            className="absolute top-1/4 right-1"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {passwordError && (
          <p className="text-red-500 text-xs">
            {" "}
            debe contener 1 mayuscula, numero, simbolos y de 8 characteres
          </p>
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
          className="bg-white rounded-md p-2 mb-2"
        />
        {passwordNoMatch && (
          <p className="text-red-500 text-xs">las contrasenas no coindiden</p>
        )}
        <input
          type="text"
          name="location"
          placeholder="enter location"
          onChange={handleChange}
          value={formData.location}
          required
          className="bg-white rounded-md p-2 mb-2"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default NutritionistRegisterForms;
