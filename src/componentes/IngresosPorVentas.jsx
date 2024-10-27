import React, { useState } from "react"

const IngresosPorVentas = () => {
    const [producto, setProducto] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [unidad, setUnidad] = useState("");
    const [ingreso, setIngreso] = useState("")
    const [registros, setRegistros] = useState([])
    const [total, setTotal] = useState(0)

    // Opciones de productos
    const productosOptions = {
        1: "Lechuga",
        2: "Acelga",
        3: "Repollo",
        4: "Arveja",
        5: "Brócoli",
        6: "Pepino",
        7: "Habichuela",
        8: "Cilantro"
    }

    // Opciones de unidades
    const unidadesOptions = [
        { value: "unidades", label: "Unidades" },
        { value: "canastillas", label: "Canastillas" },
        { value: "docenas", label: "Docenas" },
        { value: "kilogramos", label: "Kilogramos" },
        { value: "manojos", label: "Manojos" }
    ]

    const recibirDato = (e) => {
        e.preventDefault()

        // Validación de campos
        if (!producto || !cantidad || !unidad || ingreso <= 0) {
            alert("Por favor, completa todos los campos correctamente.")
            return
        }

        const nuevoIngreso = parseInt(ingreso) || 0 // Convertir ingreso a número
        const nuevoTotal = total + nuevoIngreso // Actualizar total
        setTotal(nuevoTotal)

        // Agregar el registro
        const nuevoRegistro = {
            producto: productosOptions[producto],
            cantidad: cantidad,
            unidad: unidad,
            ingreso: nuevoIngreso
        };
        setRegistros([...registros, nuevoRegistro]); // Actualizar registros

        // Limpiar campos
        setIngreso("")
        setProducto("")
        setCantidad("")
        setUnidad("")
    }

    return (
        <div className="container mt-4">
            <h2>Registro de Ingresos por Ventas</h2>
            <div className="border p-4 rounded bg-light">
                <form onSubmit={recibirDato} className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="producto" className="form-label">Producto:</label>
                        <select value={producto} onChange={(e) => setProducto(e.target.value)} className="form-select">
                            <option value="">Seleccione un producto</option>
                            {Object.keys(productosOptions).map(key => (
                                <option key={key} value={key}>{productosOptions[key]}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="form-control"/>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="unidad" className="form-label">Unidad:</label>
                        <select value={unidad} onChange={(e) => setUnidad(e.target.value)} className="form-select">
                            <option value="">Seleccione una unidad</option>
                            {unidadesOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="ingreso" className="form-label">Ingreso:</label>
                        <input type="number" value={ingreso} onChange={(e) => setIngreso(e.target.value)} className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto">Registrar Ingreso</button>
                </form>
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro.producto}</td>
                                <td>{registro.cantidad}</td>
                                <td>{registro.unidad}</td>
                                <td>${registro.ingreso.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"><strong>Total</strong></td>
                            <td><strong>${total.toLocaleString()}</strong> pesos</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default IngresosPorVentas

