import { useState } from "react";
import apiServices from "../../../services/apiServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./ProfCardComp.css"
const ProfCardComp = ({ professional, refreshUsers }) => {
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
    <li key={professional.id} className="ProfessionalCard">
      {/* <pre>{JSON.stringify(professional, null, 2)}</pre> */}
      <div className="tabs">
        <button className={`tab ${activeTab === "info" ? "active" : ""}`} onClick={() => toggleTab("info")}>
          Info
        </button>
        <button className={`tab ${activeTab === "details" ? "active" : ""}`} onClick={() => toggleTab("details")}>
          More Details
        </button>
      </div>

      <div className="tab_content">
        {activeTab === "info" && (
          <div className="tab_info">
            <img src={professional.image} alt={`${professional.firstName} ${professional.lastName}`} />
            <h3>
              {professional.title} {professional.firstName} {professional.lastName}
            </h3>
            <h4>
              <strong>Specialization:</strong> {professional.specialization}
            </h4>
            <p>
              <strong>WhatsApp:</strong> {professional.whatsapp}
            </p>
            <p>
              <strong>Username:</strong> {professional.username}
            </p>
            <p>
              <strong>Email:</strong> {professional.email}
            </p>
          </div>
        )}

        {activeTab === "details" && (
          <div className="tab_details">
            <p>
              <strong>Birthdate:</strong> {professional.birthdate}
            </p>
            <p>
              <strong>DNI:</strong> {professional.nDni}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(professional.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Bio:</strong> {professional.bio}
            </p>
            <div>
              <Link to={`/professional/${professional.id}`}>
                <button>Edit</button>
              </Link>
              <button className="button danger" onClick={() => handleDeleteProf(professional.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default ProfCardComp;
