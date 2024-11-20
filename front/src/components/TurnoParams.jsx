import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TurnoParams = () => {
  const { id } = useParams();
  const appointments = useSelector((state) => state.appointments);
  console.log(appointments);
  const appointmentWithId = appointments.find((appointment) => appointment.id === parseInt(id));
  return (
    <div>
      <h1>Turno:{id}</h1>
      <p>
        <strong>Date:</strong> {appointmentWithId.date}
      </p>
      <p>
        <strong>Time:</strong> {appointmentWithId.time}
      </p>
      <p>
        <strong>Description:</strong> {appointmentWithId.description}
      </p>
      <p>
        <strong>Status:</strong> {appointmentWithId.status}
      </p>
    </div>
  );
};

export default TurnoParams;
