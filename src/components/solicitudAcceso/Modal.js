import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import FormularioDeSolicitud from './FormularioDeSolicitud';

class ModalExample extends Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  setOpen(estado) {
    this.setState({
      open: estado
    });
  }

  render() {
    return (
        <Modal
        onClose={() => this.setOpen(true)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        size={"small"}
      >
        <Modal.Header>Formulario de solicitud de ingreso</Modal.Header>

        <Modal.Content>
        <FormularioDeSolicitud />
        </Modal.Content>
        
      </Modal>
    )
  }
}

export default ModalExample