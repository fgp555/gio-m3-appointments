import React from "react";
import AddProfessionalPage from "../AddProfessionalPage/AddProfessionalPage";
import ApptCreatePage from "../ApptCreate/ApptCreatePage";
import AddPatientPage from "../PatientsPage/AddPatientPage/AddPatientPage";
import ApptListPage from "../AppointmentsPage/ApptListPage";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="DashboardPage">
      <section className="header">
        <h1>Dashboard</h1>
      </section>

      <section>
        <h1>Create Appoinments</h1>
        <ApptCreatePage />
      </section>
      <section>
        <h1>Create Patients</h1>
        <AddPatientPage />
      </section>
      <section>
        <h1>List Appoinments</h1>
        <ApptListPage />
      </section>
    </div>
  );
};

export default DashboardPage;
