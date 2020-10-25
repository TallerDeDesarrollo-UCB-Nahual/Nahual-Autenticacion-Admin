import React from 'react';
import './App.css';
import Modal from './components/solicitudAcceso/Modal';
import Error from './components/solicitudAcceso/Error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
