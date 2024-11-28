import { useState } from "react";
import apiServices from "../../services/apiServices";

const ProfCardComp = ({ professional, refreshUsers }) => {
  const [activeTab, setActiveTab] = useState("info");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteProf = async (userId) => {
    try {
      const response = await apiServices.apiDeleteUser(userId);
      console.log(response);
      refreshUsers();

      // window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
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
              <button>Edit</button>
              <button onClick={() => handleDeleteProf(professional.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default ProfCardComp;
