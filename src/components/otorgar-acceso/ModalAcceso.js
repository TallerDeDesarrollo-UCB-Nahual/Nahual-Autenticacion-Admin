import React, { Component } from "react";
import { Button, Modal } from 'semantic-ui-react'

class ModalAcceso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false
    };
  }

  mostrarModal (estado) {
    this.setState({
      abierto: estado
    });
  }

  render() {
    return (
      <Modal
        open={this.state.abierto}
        onClose={() => this.mostrarModal (false)}
        onOpen={() => this.mostrarModal (true)}
        size="small"
        closeIcon
        trigger={<Button className='AccesoCorreo'  color = 'green' floated='right'  onClick={() => (this.mostrarModal(true))}>Dar Acceso A Correo</Button>}
      >
        {
        <Modal.Actions>
          <Button basic color="grey" onClick={() => (this.mostrarModal(false))}>
            Cerrar
          </Button>
        </Modal.Actions> 
        }
      </Modal>
    )
  }
}

export default ModalAcceso;
