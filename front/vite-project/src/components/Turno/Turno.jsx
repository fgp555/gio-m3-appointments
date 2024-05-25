import React from "react";
import styles from './Turno.module.css'

const Turno = ({ date, time, status, description, user }) => {
        const statusClass = status === 'pendiente' ? styles.pending : status === 'cancelado' ? styles.cancelled : '';
    
    return (
        <div className={styles.turno}>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Description:</strong> {description}</p>
            {/* <p><strong>Status:</strong> {status}</p> */}
            <p className={styles[status]}>{status.toUpperCase()}</p>
            <button disabled={status == "cancelled"}>Cancelar turno</button>

        </div>
    );
};

export default Turno

