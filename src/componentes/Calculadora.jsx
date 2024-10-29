import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const Calculadora = () => {
    const [minutos, setMinutos] = useState("")
    const [egresosInsumos, setEgresosInsumos] = useState("")
    const [precioJornal, setPrecioJornal] = useState(60000)
    const [totalIngresos, setTotalIngresos] = useState("")
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [registros, setRegistros] = useState([])


    const calcularHoras = () => (minutos / 60).toFixed(2)
    const calcularJornales = () => (calcularHoras() / 8.5).toFixed(2)
    const calcularEgresosManoObra = () => (calcularJornales() * precioJornal).toFixed(2)
    const calcularTotalEgresos = () => (parseFloat(egresosInsumos) + parseFloat(calcularEgresosManoObra())).toFixed(2)
    const calcularBeneficio = () => (totalIngresos / calcularTotalEgresos()).toFixed(2)

    const handleSubmit = (e) => {
        e.preventDefault()


        if (!fechaInicio || !fechaFin) {
            alert("Por favor, selecciona un rango de fechas.")
            return;
        }


        const nuevoRegistro = {
            fechaInicio,
            fechaFin,
            minutos,
            horas: calcularHoras(),
            jornales: calcularJornales(),
            egresosInsumos,
            egresosManoObra: calcularEgresosManoObra(),
            totalIngresos,
            totalEgresos: calcularTotalEgresos(),
            beneficio: calcularBeneficio(),
        }
        setRegistros([...registros, nuevoRegistro])


        setMinutos("")
        setEgresosInsumos("")
        setTotalIngresos("")
        setFechaInicio("")
        setFechaFin("")
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Calculadora de Costos y Beneficios</h1>
            <div className="border p-4 rounded bg-light">
                <form onSubmit={handleSubmit} className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label>Fecha Inicio:</label>
                        <input type="date" className="form-control" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label>Fecha Fin:</label>
                        <input type="date" className="form-control" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label>Minutos trabajados:</label>
                        <input type="number" className="form-control" value={minutos} onChange={(e) => setMinutos(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="col-md-4">
                        <label>Egresos por insumos:</label>
                        <input type="number" className="form-control" value={egresosInsumos} onChange={(e) => setEgresosInsumos(parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-md-4">
                        <label>Precio por jornal:</label>
                        <input type="number" className="form-control" value={precioJornal} onChange={(e) => setPrecioJornal(parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-md-4">
                        <label>Total ingresos:</label>
                        <input type="number" className="form-control" value={totalIngresos} onChange={(e) => setTotalIngresos(parseFloat(e.target.value) || 0)} />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Calcular y Guardar</button> <br></br>
                </form>
                <table className="table table-bordered table-striped">
                    <thead className="table-success">
                        <tr>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Minutos</th>
                            <th>Horas</th>
                            <th>Jornales</th>
                            <th>Egresos Insumos</th>
                            <th>Egresos Mano Obra</th>
                            <th>Total Ingresos</th>
                            <th>Total Egresos</th>
                            <th>Beneficio (R-B/C)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro.fechaInicio}</td>
                                <td>{registro.fechaFin}</td>
                                <td>{registro.minutos}</td>
                                <td>{registro.horas}</td>
                                <td>{registro.jornales}</td>
                                <td>${registro.egresosInsumos}</td>
                                <td>${registro.egresosManoObra}</td>
                                <td>${registro.totalIngresos}</td>
                                <td>${registro.totalEgresos}</td>
                                <td>${registro.beneficio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calculadora