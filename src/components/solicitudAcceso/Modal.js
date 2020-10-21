import React, { Component } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import FormularioDeSolicitud from './FormularioDeSolicitud'

class ModalExample extends Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

//   obtenerEgresadeDeAPI() {
//     const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/estudiantes/`;
//     axios
//       .get(`${API_URL}${this.props.egresadeId}`)
//       .then(response => {
//         this.setState({
//           egresade: response.data.response
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

  setOpen(estado) {
    this.setState({
      open: estado
    });
  }

  render() {
    return (
        <Modal
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        size={"small"}

        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Formulario de soliciut de ingreso</Modal.Header>

        <Modal.Content>
        <FormularioDeSolicitud />
        </Modal.Content>
        
      </Modal>
    )
  }
}

export default ModalExample