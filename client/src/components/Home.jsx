import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-lg">
      <Link to={"/patientform"}> form</Link>
      <Link to={"/nutripatients"}> my patients</Link>
    </div>
  );
}

export default Home;
