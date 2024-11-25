const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS to allow requests from frontend (if running on a different port)
app.use(cors());
app.use(express.json());

// Demo data: array of appointments
let demoData = [
  { id: 1, date: "2024-11-21T10:00:00.000Z", description: "Meeting with Team A" },
  { id: 2, date: "2024-11-21T14:30:00.000Z", description: "Doctor's appointment" },
  { id: 3, date: "2024-11-22T11:00:00.000Z", description: "Client call" },
  { id: 4, date: "2024-11-19T09:30:00.000Z", description: "Project review" },
  { id: 5, date: "2024-11-19T16:00:00.000Z", description: "Team brainstorming session" },
];

// Get all appointments
app.get("/appointments", (req, res) => {
  res.json(demoData);
});

// Create a new appointment
app.post("/appointments", (req, res) => {
  const { description, date } = req.body;
  const newId = demoData.length + 1;
  const newAppointment = {
    id: newId,
    description,
    date,
  };

  demoData.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Update an existing appointment
app.put("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { description, date } = req.body;

  let appointment = demoData.find((appt) => appt.id == id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  appointment.description = description || appointment.description;
  appointment.date = date || appointment.date;

  res.json(appointment);
});

// Delete an appointment
app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  demoData = demoData.filter((appt) => appt.id != id);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
