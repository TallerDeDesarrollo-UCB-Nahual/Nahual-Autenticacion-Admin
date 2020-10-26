import React from 'react';
import './App.css';
import {Route, Switch } from 'react-router-dom';
import Nahual_Table from './components/lista-solicitudes/Tabla';

function App() {
  return (
    <div>
        <Switch>
            <Route path="/solicitudes" component={Nahual_Table} />
        </Switch>
      </div>
  );
}

export default App;
