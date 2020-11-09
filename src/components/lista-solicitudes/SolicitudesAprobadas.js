import React, { Component } from "react";
import { Button, Label, Message, Table } from "semantic-ui-react";
import "../../public/stylesheets/Table.css";
const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;
export class SolicitudesAprobadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      error: ""
    };
    this.props.estableserCargando(true);
  }
  obtenerSolicitudes() {
    fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}usuariosConAcceso`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          solicitudes: res.data
        });
        this.props.estableserCargando(false);
      })
      .catch((error) => {
        this.setState({
          error: error.message
        });
        this.props.estableserCargando(false);
      });
  }
  mostrarError() {
    return (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{this.state.error}</p>
      </Message>
    );
  }

  componentDidMount() {
    this.obtenerSolicitudes();
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          this.mostrarError()
        ) : (
          <div>
            <Table celled className="tarjeta-tabla">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Nombre y Apellido
                  </Table.HeaderCell>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Correo
                  </Table.HeaderCell>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Acción
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.solicitudes &&
                  this.state.solicitudes.map((solicitud, indice) => (
                    <Table.Row key={indice}>
                      <Table.Cell className="bordes-tabla">
                        <Label className="nombre">{solicitud.nombre}</Label>
                        <br></br>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        <Label className="email">{solicitud.email}</Label>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        <Button positive>Revocar Accesso</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default SolicitudesAprobadas;
