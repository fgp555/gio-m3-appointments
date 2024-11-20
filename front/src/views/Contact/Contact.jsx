import React from "react";
import styles from "./Contact.module.css";

const Contacto = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contacto</h1>
      <p className={styles.description}>
        Si tienes alguna pregunta o deseas agendar una cita, no dudes en contactarnos a través del siguiente formulario o utilizando los datos de contacto proporcionados.
      </p>
      <div className={styles.contactInfo}>
        <h2 className={styles.subtitle}>Datos de Contacto</h2>
        <p>
          <strong>Dirección:</strong> Calle Falsa 123, Corrientes, Argentina
        </p>
        <p>
          <strong>Celular:</strong> 3794 - 1234
        </p>
        <p>
          <strong>Email:</strong> contacto@clinicakinesiologia.com
        </p>
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Envíanos un Mensaje</h2>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
