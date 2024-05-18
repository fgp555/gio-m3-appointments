import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>Bienvenidos a Nuestro Consultorio</h2>
            <div>
                {/* Aquí iría tu formulario de turnos, si lo tienes */}
                <form>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" />
                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" />
                    {/* Otros campos del formulario */}
                    <button type="submit">Solicitar Turno</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
