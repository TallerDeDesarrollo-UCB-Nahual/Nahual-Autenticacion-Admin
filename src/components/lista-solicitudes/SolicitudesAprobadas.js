import React, { Component } from 'react'
import { Button, Label, Table } from 'semantic-ui-react';
import '../../public/stylesheets/Table.css';
const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;
export class SolicitudesAprobadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      estaCargando: false
    }
  }
  obtenerSolicitudes() {
    fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}usuariosConAcceso`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          solicitudes: res.data,
          estaCargando: false
        });
      }) .catch( err => {
        console.log("Error");
      })
  }


  componentDidMount() {
    this.obtenerSolicitudes();
  }

  render() {
    return (
      <div>
        <div className="tabla">
          {/* <div>
       {this.state.mostrarMensajeDeEstado &&
         <Message
           positive
           onDismiss={this.manejarProblemas}
           header='Solicitud Aceptada!'
           content={this.state.mensajeDeEstado}
         ></Message>
       }
     </div> */}
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Correo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Empresass</Table.HeaderCell>

                <Table.HeaderCell className="cabeceras-tabla">Nahual</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.solicitudes && this.state.solicitudes.map((solicitud) => (
                <Table.Row key={solicitud.id}>
                  <Table.Cell className="bordes-tabla">
                    <Label className="nombre">{solicitud.nombre}</Label><br></br>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    <Label className="email">{solicitud.email}</Label>
                  </Table.Cell >

                  <Table.Cell className="bordes-tabla">
                    <div> sas</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <div> {solicitud.permisoNahual}</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Button positive>Revocar Accesso</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}

export default SolicitudesAprobadas
