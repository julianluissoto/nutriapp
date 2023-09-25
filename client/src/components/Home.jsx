import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-lg w-[300px] md:w-[400px] m-auto mt-[20%] h-full ">
      <h1 className="text-3xl  text-cyan-800 font-semibold">
        BIENVENIDO A <strong>NUTRIWEB </strong>{" "}
      </h1>

      <h3 className="break-words text-cyan-800 font-semibold">
        LA MEJOR FORMA DE ESTAR EN CONTACTO CON TUS PACIENTES
      </h3>
      <Link
        to="/Nutrilogin"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md mb-2"
      >
        Ingreso como Nutricionista
      </Link>
      <Link
        to="/Nutrisignup"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md mb-2"
      >
        Registro como Nutricionista
      </Link>

      <Link
        to="/nutripatients"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md mb-2"
      >
        Mis Pacientes
      </Link>
      <Link
        to="/user/login"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md mb-2"
      >
        Ingreso como paciente
      </Link>
      {/* <Link
        to="/user/signup"
        className="block bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md mb-2"
      >
        Registro como paciente
      </Link> */}
    </div>
  );
}

export default Home;
