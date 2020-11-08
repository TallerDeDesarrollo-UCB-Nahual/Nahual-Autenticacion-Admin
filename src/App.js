import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Modal from './components/solicitudAcceso/Modal';
import Error from './components/solicitudAcceso/Error';
import { Solicitudes } from './components/lista-solicitudes/Solicitudes';

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
          <Route path="/solicitudes" component={Solicitudes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
