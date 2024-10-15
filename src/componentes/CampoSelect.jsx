import React, { useState } from "react"

const CampoSelect = () => {
    const [actividad, setActividad] = useState("")
    const [fecha, setFecha] = useState("")
    const [tiempoTotal, setTiempoTotal] = useState(0)
    const [tiempo, setTiempo] = useState(0) 
    const [registros, setRegistros] = useState([])

    const recibirDato = (e) => {
        e.preventDefault()
        const nuevoTiempo = parseInt(tiempo) || 0
        const nuevoTotal = tiempoTotal + nuevoTiempo
        setTiempoTotal(nuevoTotal)

    
        const fechaObj = new Date(fecha)
        const dia = fechaObj.getUTCDate()
    
        const nuevoRegistro = { actividad, fecha: dia, tiempo: nuevoTiempo }
        setRegistros([...registros, nuevoRegistro])
    
        setTiempo(0)
    }

    const manejarActividadCambio = (e) => {
        setActividad(e.target.value)
        setTiempo(0)
    }
    
    return (
        <div>
            <form onSubmit={recibirDato}>
                <label htmlFor="actividad">Actividad:
                    <select value={actividad} onChange={manejarActividadCambio}>
                        <option value="">Seleccione una actividad</option>
                        <option value="1">Adecuación de terreno</option>
                        <option value="2">Siembra y trasplante</option>
                        <option value="3">Fertilización y enmiendas</option>
                    </select>
                </label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <label htmlFor="tiempo">Tiempo en minutos:
                    <input 
                        type="number" 
                        value={tiempo} 
                        onChange={(e) => setTiempo(e.target.value)} 
                    />
                </label>
                <button type="submit">Calcular tiempo total</button>
            </form>

            <h2>Registros de Actividades</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>Fecha</th>
                        <th>Tiempo (min)</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro.actividad}</td>
                            <td>{registro.fecha}</td>
                            <td>{registro.tiempo}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2"><strong>Total</strong></td>
                        <td><strong>{tiempoTotal}</strong> minutos</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CampoSelect

