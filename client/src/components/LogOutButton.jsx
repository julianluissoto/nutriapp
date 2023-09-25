import Swal from "sweetalert2";
import { useUser } from "../context/nutritionistContext";
import { useNavigate } from "react-router-dom";
function LogOutButton() {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    // Call the logout function to clear the user data
    Swal.fire({
      title: "Seguro que quieres salir?",
      text: "Deberas ingresar nuevamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, salir",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saliste con existo!", "Hasta la proxima", "success");
        logout(); // Logout the user
        navigate("/");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md mt-2"
    >
      salir
    </button>
  );
}

export default LogOutButton;
