import React, { Component } from "react";
import { Button, Modal } from 'semantic-ui-react'
import CuerpoModal from './CuerpoModal'

class ModalOtorgarAcceso extends Component {
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
        trigger={<Button className='AccesoCorreo'  color = 'green' floated='right'  onClick={() => (this.mostrarModal(true))} style={{ marginTop: 100 }}>Otorgar acceso directo</Button>}
      >
        <CuerpoModal cerrarModal={() => (this.mostrarModal (false))}></CuerpoModal> 
      </Modal>
    )
  }
}

export default ModalOtorgarAcceso;