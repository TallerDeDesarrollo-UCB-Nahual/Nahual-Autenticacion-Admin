import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/lista-egresades/Navbar';
import Nahual_Table from './components/lista-egresades/Tabla';
import InicioSesion from "./components/inicio-de-sesion/InicioSesion";

function App() {
  return (
    <div>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={InicioSesion} />
            <Route path="/solicitudes" component={Nahual_Table} />
        </Switch>
      </div>
  );
}

export default App;
