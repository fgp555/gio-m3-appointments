interface Appointment {
  id?: number;
  date: Date;
  time: string;
  userId: number;
  status: "active" | "cancelled";
}

export default Appointment;
