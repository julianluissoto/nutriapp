import { useState } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/nutritionistContext";
const NutritionistLoginForm = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const { setUser } = useUser();

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the server
      const response = await axios.post("nutrilogin", formData);
      const nutriDataPatients = response.data.nutritionist;

      // Assuming the server returns a success status
      if (response.status === 200) {
        Swal.fire("Success!", "Logged in successfully", "success");
        // Redirect the user to the dashboard or any other page after successful login
        setUser({ nutriDataPatients });
        navigate("/nutripatients");
      } else {
        // Handle unsuccessful login (e.g., display an error message)
        Swal.fire("Error", "Invalid email or password", "error");
      }
    } catch (error) {
      // Handle login error (e.g., network error, server error)
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-blue-300 p-4 mt-[25%] rounded-md max-w-lg m-auto">
      <h2 className="text-white mb-4 font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="bg-white rounded-md p-2 mb-2"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            name="password"
            placeholder="Password"
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default NutritionistLoginForm;
