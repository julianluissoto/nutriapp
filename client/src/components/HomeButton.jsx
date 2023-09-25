import { Link, useLocation } from "react-router-dom";

function HomeButton() {
  const location = useLocation();

  // Check if the current URL path is not "/"
  const isNotRootPath = location.pathname !== "/";

  return isNotRootPath ? (
    <Link to={"/"}>
      <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded absolute top-4 right-4">
        Home
      </button>
    </Link>
  ) : null;
}

export default HomeButton;
