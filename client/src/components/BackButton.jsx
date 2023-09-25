import { useNavigate } from "react-router-dom"; // Import useHistory to navigate back
import { BsArrowLeftSquareFill } from "react-icons/bs";

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={goBack}
      className=" text-cyan-700 font-bold py-2 px-4 rounded flex items-center space-x-2"
    >
      <BsArrowLeftSquareFill /> Volver
    </button>
  );
}

export default BackButton;
