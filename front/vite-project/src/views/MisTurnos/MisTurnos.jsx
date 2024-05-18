import React from "react";
import{ useState } from "react";
import Turno from "../../components/Turno/Turno";
import myTurns from "../../helpers/myTurns";


const MisTurnos = () => {
    const [turnos, setTurnos] = useState(myTurns);
    console.log(turnos)
 
    return (
        <div>
            <h1>Mis Turnos</h1>
            <h3>Estos son los turnos del Usuario</h3>
            
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