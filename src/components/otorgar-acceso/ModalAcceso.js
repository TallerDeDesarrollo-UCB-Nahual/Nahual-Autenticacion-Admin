import React, { Component } from "react";
import { Button, Modal } from 'semantic-ui-react'
import CuerpoModal from './CuerpoModal'

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
        trigger={<Button className='AccesoCorreo'  color = 'green' floated='right'  onClick={() => (this.mostrarModal(true))}>Otorgar acceso directo</Button>}
      >
        <CuerpoModal cerrarModal={() => (this.mostrarModal (false))}></CuerpoModal> 
      </Modal>
    )
  }
}

export default ModalAcceso;
