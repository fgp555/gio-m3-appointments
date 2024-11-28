import React, { useEffect, useState } from "react";
import apiServices from "../../../services/apiServices";
import "./ProfessionalsPage.css";

const ProfessionalsPage = () => {
  const [roles, setRoles] = useState({
    doctor: [
      {
        id: 5,
        firstName: "Carlos Andrés",
        lastName: "López Rodríguez",
        email: "carlos.lopez@cliniccare.com",
        whatsapp: "+5491123456793",
        username: "doctor_carlos",
        birthdate: "1980-03-10",
        nDni: "26543210",
        image: "https://bit.ly/fgpImg1",
        role: "doctor",
        createdAt: "2024-11-27T23:47:30.677Z",
        appointmentsAsPatient: [],
        appointmentsAsDoctor: [
          {
            id: 22,
            date: "2024-11-27T17:00:00.000Z",
            description: "description 123",
            status: "PENDING",
            createdAt: "2024-11-28T00:39:30.119Z",
          },
        ],
      },
      {
        id: 6,
        firstName: "Sofía Elena",
        lastName: "Rodríguez Hernández",
        email: "sofia.rodriguez@cliniccare.com",
        whatsapp: "+5491123456794",
        username: "doctor_sofia",
        birthdate: "1987-06-20",
        nDni: "28903210",
        image: "https://bit.ly/fgpImg1",
        role: "doctor",
        createdAt: "2024-11-27T23:47:30.680Z",
        appointmentsAsPatient: [],
        appointmentsAsDoctor: [],
      },
    ],
    patient: [],
  });
  const getUserByRole = async (role) => {
    try {
      const response = await apiServices.getApiUserByRole(role);
      return response;
    } catch (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUsersByRoles = async () => {
      const newRoles = { ...roles };
      for (const role of ["doctor", "patient"]) {
        const data = await getUserByRole(role);
        newRoles[role] = data;
      }
      setRoles(newRoles);
    };
    fetchUsersByRoles();
  }, []);

  return (
    <div className="ProfessionalsPage">
      <div>ProfessionalsPage</div>
      <section>
        <h2>Professionals</h2>
        <ul className="cards_container">
          {roles.doctor.map((doctor) => (
            <li key={doctor.id} className="card_item">
              <aside className="aside_left">
                <img src={doctor.image} alt="" />
              </aside>
              <aside className="aside_right">
                <h3>
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p>{doctor.email}</p>
                <p>{doctor.whatsapp}</p>
                <p>{doctor.username}</p>
                <p>{doctor.birthdate}</p>
                <p>{doctor.nDni}</p>
                <p>{doctor.role}</p>
                <p>{doctor.createdAt}</p>
              </aside>

              {/* <p>{doctor.appointmentsAsPatient}</p> */}
              {/* <p>{doctor.appointmentsAsDoctor}</p> */}
            </li>
          ))}
        </ul>
      </section>
      <pre>{JSON.stringify(roles, null, 2)}</pre>
    </div>
  );
};

export default ProfessionalsPage;
