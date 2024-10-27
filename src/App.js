import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CampoSelect from './componentes/CampoSelect';
import EgresosPorInsumos from './componentes/EgresosPorInsumos';
import IngresosPorVentas from './componentes/IngresosPorVentas';
import Calculadora from './componentes/Calculadora';

function App() {
  return (
    <div className="App">
      <CampoSelect/>
      <EgresosPorInsumos/>
      <IngresosPorVentas/>
      <Calculadora/>
    </div>
  );
}

export default App;

//</>