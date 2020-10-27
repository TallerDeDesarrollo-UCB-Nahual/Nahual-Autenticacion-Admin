import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import Nahual_Table from './components/lista-solicitudes/Tabla';
import InicioSesion from "./components/inicio-de-sesion/InicioSesion";
import Modal from './components/solicitudAcceso/Modal';
import Error from './components/solicitudAcceso/Error';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact render={ (props) =>(
            <React.Fragment>   
            <Modal {...props} />
            </React.Fragment>
          )}/>
          <Route path='/error' exact component={Error}/>
          <Route path="/solicitudes" component={Nahual_Table} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
