import React, { useState } from "react"

const CampoSelect = () => {
    const [actividad, setActividad] = useState("")
    const [fecha, setFecha] = useState("")
    const [tiempoTotal, setTiempoTotal] = useState(0)
    const [tiempo, setTiempo] = useState(0)
    const [registros, setRegistros] = useState([])

    const actividadesOptions = {
        1: "Adecuación de terreno",
        2: "Siembra y trasplante",
        3: "Fertilización y enmiendas",
        4: "Control de arvenses",
        5: "Control fitosanitario",
        6: "Riego",
        7: "Labores Agroculturales",
        8: "Cosecha y pos cosecha"
    }

    const recibirDato = (e) => {
        e.preventDefault()

        // Validación
        if (!actividad || !fecha || tiempo <= 0) {
            alert("Por favor, completa todos los campos correctamente.")
            return
        }

        const nuevoTiempo = parseInt(tiempo) || 0
        const nuevoTotal = tiempoTotal + nuevoTiempo;
        setTiempoTotal(nuevoTotal)

        const fechaObj = new Date(fecha)
        const mes = fechaObj.toLocaleString('default', { month: 'long' });
        const dia = fechaObj.getUTCDate()

        const nuevoRegistro = {
            actividad: actividadesOptions[actividad],
            fecha: `${mes} ${dia}`,
            tiempo: nuevoTiempo
        }
        setRegistros([...registros, nuevoRegistro])

        setTiempo(0)
        setActividad("")
        setFecha("")
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Registro de Actividades</h1>
            <div className="border p-4 rounded bg-light">
                <form onSubmit={recibirDato} className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label htmlFor="actividad" className="form-label">Actividad:</label>
                        <select className="form-select" value={actividad} onChange={(e) => setActividad(e.target.value)}>
                            <option value="">Seleccione una actividad</option>
                            {Object.keys(actividadesOptions).map(key => (
                                <option key={key} value={key}>{actividadesOptions[key]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="fecha" className="form-label">Fecha:</label>
                        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="tiempo" className="form-label">Tiempo en minutos:</label>
                        <input type="number" className="form-control" value={tiempo} onChange={(e) => setTiempo(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Registrar Actividad</button>
                </form>
                <table className="table table-bordered mt-3">
                    <thead className="table-success">
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
        </div>
    )
}

export default CampoSelect