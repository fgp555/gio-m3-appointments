import React from "react";
import styles from "./Turno.module.css";
import { Link } from "react-router-dom";

const Turno = ({ date, time, status, description, user, handleCancel, id }) => {
  const statusClass = status === "pendiente" ? styles.pending : status === "cancelado" ? styles.cancelled : "";

  return (
    <div className={styles.turno}>
      <Link to={`/turno/${id}`}>
        <p>
          <strong>id</strong> {id}
        </p>
      </Link>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      {/* <p><strong>Status:</strong> {status}</p> */}
      <p className={styles[status]}>{status.toUpperCase()}</p>
      <button
        onClick={() => {
          handleCancel(id);
        }}
        disabled={status == "cancelled"}
      >
        Cancelar turno
      </button>
    </div>
  );
};

export default Turno;
