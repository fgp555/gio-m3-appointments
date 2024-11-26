import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay, isSameWeek, isSameMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../../redux/userAppointmentsSlice";
import apiServices from "../../../services/apiServices";
import "./ApptListPage.css";

const ApptListPage = () => {
  const appoinmentSelector = useSelector((state) => state.appointments);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [view, setView] = useState("day");
  // const [apptState, setApptState] = useState([]);

  const dispatch = useDispatch();

  const fetchAppointmentsFromApi = async () => {
    try {
      const response = await apiServices.fetchAppointments();
      dispatch(fetchAppointments(response));
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentsFromApi();
  }, []);

  const cancelAppt = (id) => {
    fetch(`/api/appointments/cancel/${id}`, {
      method: "PUT",
    })
      .then(() => {
        // getUserAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const deleteAppt = (id) => {
    fetch(`/api/appointments/cancel/${id}`, {
      method: "PUT",
    })
      .then(() => {
        // getUserAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  // Filter appointments based on the selected view
  const filteredAppointments = appoinmentSelector.filter((appt) => {
    const appointmentDate = new Date(appt.date);
    if (view === "day") {
      return isSameDay(appointmentDate, selectedDay);
    } else if (view === "week") {
      // Get the start and end of the selected week
      const weekStart = startOfWeek(selectedDay, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDay, { weekStartsOn: 1 });
      return appointmentDate >= weekStart && appointmentDate <= weekEnd;
    } else if (view === "month") {
      // Get the start and end of the selected month
      const monthStart = startOfMonth(selectedDay);
      const monthEnd = endOfMonth(selectedDay);
      return appointmentDate >= monthStart && appointmentDate <= monthEnd;
    }
    return false;
  });

  // Helper function to get active button style
  const getButtonStyle = (viewType) => {
    return view === viewType
      ? { backgroundColor: "#4CAF50", color: "white" } // Green color for active view
      : {};
  };

  return (
    <>
      <div className="ApptCalendarContainer">
        {/* <pre>{JSON.stringify(appoinmentSelector, null, 2)}</pre> */}
        <section className="calendar_section">
          <div className="DatePicker">
            <DatePicker
              //
              selected={selectedDay}
              onChange={(date) => setSelectedDay(date)}
              inline
              highlightDates={appoinmentSelector.map((appt) => new Date(appt.date))}
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <button onClick={() => setView("day")} style={getButtonStyle("day")}>
              Día
            </button>
            <button onClick={() => setView("week")} style={getButtonStyle("week")}>
              Semana
            </button>
            <button onClick={() => setView("month")} style={getButtonStyle("month")}>
              Mes
            </button>
          </div>
        </section>

        <section>
          <div>
            <h3>
              Citas para {view === "day" && `el ${format(selectedDay, "MMMM d, yyyy")}`}
              {view === "week" && `la semana de ${format(selectedDay, "MMMM d")}`}
              {view === "month" && `el mes de ${format(selectedDay, "MMMM")}`}
            </h3>

            {filteredAppointments.length > 0 ? (
              <ul className="appt_list_container">
                {filteredAppointments.map((appt) => (
                  <li key={appt.id}>
                    {/* {view === "day" && format(new Date(appt.date), "h:mm aa")}
                {view === "week" && `${format(new Date(appt.date), "EEE")} ${format(new Date(appt.date), "d")}`}
                {view === "month" && `${format(new Date(appt.date), "MMM d")} - ${format(new Date(appt.date), "h:mm aa")}`} —
                 */}
                    {/* ========== ========== */}
                    <section className="appt_list">
                      <aside className="info">
                        <div className="name">
                          <i className="icon-user"></i>
                          <strong> {appt.patient.firstName} </strong>
                          <i className="mobile_none lastName">{appt.doctor.lastName} </i>
                        </div>
                        <p className="time_date_container">
                          <i className="icon-clock"></i>
                          <b className="date_time">
                            {view === "day" && format(new Date(appt.date), "h:mm aa", { locale: es })} {/* Only time for 'day' view */}
                            {view === "week" && `${format(new Date(appt.date), "EEE", { locale: es })} ${format(new Date(appt.date), "d", { locale: es })}`}{" "}
                            {/* Day of the week and date for 'week' view */}
                            {view === "month" && `${format(new Date(appt.date), "MMM d", { locale: es })} - ${format(new Date(appt.date), "h:mm aa", { locale: es })}`}{" "}
                            {/* Full date and time for 'month' view */}
                          </b>
                        </p>
                        <p>
                          <i className="icon-doctor"></i> {appt.doctor.firstName}{" "}
                        </p>
                        <p className="description">
                          <i className="icon-book"></i>
                          <b>{appt.description} </b>
                        </p>
                      </aside>
                      <aside className="buttons">
                        <p>{appt.status} </p>
                        <button onClick={() => cancelAppt(appt.id)}>Cancel</button>
                        <button onClick={() => deleteAppt(appt.id)}>Delete</button>
                      </aside>
                    </section>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay citas para esta vista.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ApptListPage;
