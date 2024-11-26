import React, { useState } from "react";
import SelectComponent from "./SelectComponent";

const Page = () => {
  const [selectedRoles, setSelectedRoles] = useState({
    patientId: "3", // Valores predeterminados
    doctorId: "7", // Valores predeterminados
  });

  const handleSelectRolesChange = (newSelectRoles) => {
    setSelectedRoles(newSelectRoles);
    console.log("Estado actualizado desde el hijo:", newSelectRoles);
  };

  return (
    <>
      <h1>Componente Padre</h1>
      <pre>{JSON.stringify(selectedRoles, null, 2)}</pre>
      <SelectComponent
        onSelectRolesChange={handleSelectRolesChange}
        defaultRoles={selectedRoles} // Enviamos los valores predeterminados
      />
    </>
  );
};

export default Page;
