import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay, isSameWeek, isSameMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../../redux/userAppointmentsSlice";
import apiServices from "../../../services/apiServices";
import "./ApptListPage.css";
import TableApptComponent from "../../components/TableApptComponent/TableApptComponent";

const ApptListPage = () => {
  const appoinmentSelector = useSelector((state) => state.appointments);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [view, setView] = useState("day");
  // const [apptState, setApptState] = useState([]);
  const [selectedCount, setSelectedCount] = useState(() => {
    const savedCount = localStorage.getItem("selectedCount");
    return savedCount ? parseInt(savedCount, 10) : 3; // Predeterminado a 3
  });

  const handleChange = (e) => {
    setSelectedCount(parseInt(e.target.value, 10) || 0); // Asegura que el valor sea un número
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  useEffect(() => {
    localStorage.setItem("selectedCount", selectedCount);
  }, [selectedCount]);

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
    console.log("Appointments fetched successfully:", appoinmentSelector);
  }, [selectedDay]);

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

  const getAppointmentsLastCount = async () => {
    try {
      // const response = await apiServices.fetchAppointmentsLastCount(selectedCount);
      // setLatestAppointments(response);
      // console.log("Appointments fetched successfully:", response);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    getAppointmentsLastCount();
  }, []);
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
        </section>

        <section>
          <section className="buttons_filters">
            <button className={view === "day" ? "active" : ""} onClick={() => handleViewChange("day")}>
              Day
            </button>
            <button className={view === "week" ? "active" : ""} onClick={() => handleViewChange("week")}>
              Week
            </button>
            <button className={view === "month" ? "active" : ""} onClick={() => handleViewChange("month")}>
              Month
            </button>

            <p className="appt_count"> {filteredAppointments.length}</p>
          </section>

          <TableApptComponent
            //
            appoinmentData={filteredAppointments}
            viewProps={view}
            handleUpdateAppt={fetchAppointmentsFromApi}
          />
        </section>
      </div>
    </>
  );
};

export default ApptListPage;
