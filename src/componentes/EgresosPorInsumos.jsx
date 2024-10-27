import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const EgresosPorInsumos = () => {
    const [actividad, setActividad] = useState("")
    const [insumo, setInsumo] = useState("")
    const [costo, setCosto] = useState(0)
    const [registros, setRegistros] = useState([])

    const actividades = [
        "Adecuación de terreno",
        "Siembra y trasplante",
        "Fertilización y enmiendas",
        "Control de arvenses",
        "Control fitosanitario",
        "Riego",
        "Labores Agroculturales",
        "Cosecha y pos cosecha"
    ]

    const insumos = [
        "Hilaza",
        "Microconectores",
        "Aspersor",
        "Goteros",
        "Beauveria bassiana",
        "Lecanicilium lecani",
        "Urea",
        "KCl",
        "DAP",
        "Semillas",
        "Turba",
        "Compost 50 Kg",
        "Cal",
        "Tierra micorrizada"
    ]

    const manejarActividadCambio = (e) => {
        setActividad(e.target.value)
    }

    const manejarInsumoCambio = (e) => {
        setInsumo(e.target.value)
    }

    const recibirDato = (e) => {
        e.preventDefault()
        const nuevoRegistro = {
            actividad,
            insumo,
            costo: parseInt(costo) || 0
        };
        setRegistros([...registros, nuevoRegistro])
        setInsumo("")
        setCosto(0)
        setActividad("")
    }

    const totalEgresos = registros.reduce((acc, registro) => acc + registro.costo, 0)

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Egresos por Insumos</h2>
            <div className="border p-4 rounded bg-light">
                <form onSubmit={recibirDato} className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label htmlFor="actividad" className="form-label">Actividad:</label>
                        <select className="form-select" value={actividad} onChange={manejarActividadCambio}>
                            <option value="">Seleccione una actividad</option>
                            {actividades.map((act, index) => (
                                <option key={index} value={act}>{act}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="insumo" className="form-label">Insumo:</label>
                        <select className="form-select" value={insumo} onChange={manejarInsumoCambio}>
                            <option value="">Seleccione un insumo</option>
                            {insumos.map((insumoItem, index) => (
                                <option key={index} value={insumoItem}>{insumoItem}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="costo" className="form-label">Costo:</label>
                        <input type="number" className="form-control" value={costo} onChange={(e) => setCosto(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Agregar Egreso</button>
                </form>
                <table className="table table-bordered table-striped">
                    <thead className="table-success">
                        <tr>
                            <th>Actividad</th>
                            <th>Insumo</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro.actividad}</td>
                                <td>{registro.insumo}</td>
                                <td>${registro.costo.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2"><strong>TOTAL</strong></td>
                            <td><strong>${totalEgresos.toLocaleString()}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default EgresosPorInsumos
