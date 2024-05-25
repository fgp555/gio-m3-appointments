import React, { useEffect } from "react";
import { useState } from "react";
import Turno from "../../components/Turno/Turno";
import axios from "axios";

const MisTurnos = () => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/appointments');
                setTurnos(response.data);  

            } catch (error) {
              
            }
        }

        fetchTurnos();
    }, []);

    return (
        <div>
            <h1>Mis Turnos</h1>
            <h3>Bienvenido! Usuario estos son tus turnos</h3>

            {turnos.map(turno => (
                <Turno
                    key={turno.id}
                    date={turno.date}
                    time={turno.time}
                    status={turno.status}
                    description={turno.description}
                    user={turno.user}
                />
            ))}
        </div>
    );
}

export default MisTurnos;