import { Button, Spinner } from "flowbite-react";

export default function Loader() {
  return (
    <>
      <Button>
        <Spinner aria-label="Spinner button example" />
        <span className="pl-3">Cargando...</span>
      </Button>
    </>
  );
}
