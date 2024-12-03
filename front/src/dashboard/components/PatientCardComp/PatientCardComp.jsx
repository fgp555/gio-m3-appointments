import { useState } from "react";
import apiServices from "../../../services/apiServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./PatientCardComp.css";
const PatientCardComp = ({ patient, refreshUsers }) => {
  const [activeTab, setActiveTab] = useState("info");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteProf = async (userId) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de eliminar este usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await apiServices.apiDeleteUser(userId);

      Swal.fire({
        title: "¡Eliminado!",
        text: "El usuario ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#2b4168",
      });

      refreshUsers();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario.",
        icon: "error",
        confirmButtonColor: "#2b4168",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <li key={patient.id} className="PatienCardComp">
      {/* <pre>{JSON.stringify(, null, 2)}</pre> */}

      <div className="tab_content">
        {activeTab === "info" && (
          <div className="tab_info">
            <aside>
              <h4>
                {patient.title} {patient.firstName} {patient.lastName}
              </h4>
              <p>
                <strong>DNI:</strong> {patient.nDni}
              </p>
              <p>
                <strong>WhatsApp:</strong> {patient.whatsapp}
              </p>
              <p>
                <strong>Email:</strong> {patient.email}
              </p>
              <p>
                <strong>Creado el:</strong> {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </aside>
            <div className="actions">
              <Link to={`/patient1/${patient.id}`}>
                <i className="icon-pencil"></i>
              </Link>
              <br />
              <i className="button danger icon-trash" onClick={() => handleDeleteProf(patient.id)}></i>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="tab_details">
            <aside>
              <p>
                <strong>Birthdate:</strong> {patient.birthdate}
              </p>
              <p>
                <strong>DNI:</strong> {patient.nDni}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(patient.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Bio:</strong> {patient.bio}
              </p>
            </aside>
          </div>
        )}
      </div>
      {/* <div className="tabs">
        <button className={`tab ${activeTab === "info" ? "active" : ""}`} onClick={() => toggleTab("info")}>
          Info
        </button>
        <button className={`tab ${activeTab === "details" ? "active" : ""}`} onClick={() => toggleTab("details")}>
          More Details
        </button>
      </div> */}
    </li>
  );
};

export default PatientCardComp;
