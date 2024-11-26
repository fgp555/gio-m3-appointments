import React, { useState } from "react";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import ApptListComponent from "../../components/ApptListComponent/ApptListComponent";

const Page = () => {
  const [selectedRoles, setSelectedRoles] = useState({
    patientId: "3",
    doctorId: "7",
  });

  const handleSelectRolesChange = (newSelectRoles) => {
    setSelectedRoles(newSelectRoles);
    console.log("Estado actualizado desde el hijo:", newSelectRoles);
  };

  return (
    <>
      {/* <h1>Componente Padre</h1> */}

      {/* <pre>{JSON.stringify(selectedRoles, null, 2)}</pre> */}
      {/* <SelectComponent
        onSelectRolesChange={handleSelectRolesChange}
        defaultRoles={selectedRoles}
        //
      /> */}
      <ApptListComponent />
    </>
  );
};

export default Page;
