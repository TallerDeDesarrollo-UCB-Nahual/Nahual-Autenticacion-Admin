import React, { Component } from "react";
import { Label, Button, Message, Table } from "semantic-ui-react";
import "../../public/Stylesheets/Table.css";

const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;
class SolicitudesPendientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false,
      estaCargando: false,
      error: ""
    };
    this.props.mostrarCargando(true);
  }

  obtenerSolicitudes() {
    fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}solicitudes`)
      .then((res) => {
        return res.json();
      })
      .then((respuesta) => {
        let datoRespuesta = respuesta;
        this.setState({
          api: datoRespuesta.data,
          filasEncontradas: datoRespuesta.data
        });
        this.props.mostrarCargando(false);
      }).catch((error) => {
        this.setState({
          error: error.message
        });
        this.props.mostrarCargando(false);
      });
  }

  componentDidMount() {
    this.obtenerSolicitudes();
  }

  mostrarMensaje() {
    this.setState({ mostrarMensajeDeEstado: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false });
  };

  otorgarAcceso = async (valor) => {
    this.setState({ estaCargando: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valor)
    };
    try {
      var res = await fetch(
        `${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}otorgarAcceso`,
        requestOptions
      );
      this.mostrarMensaje();
      this.setState({
        mensajeDeEstado: `Se le otorgó el acceso al usuario ${valor.email}.`
      });
      res = await fetch(
        `${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}solicitudes/${valor.id}`,
        { method: "DELETE" }
      );
    } catch (error) {
      console.log(error);
      this.setState({
        error: error.message
      });
      this.props.mostrarCargando(false);
    }
    this.setState({ estaCargando: false });
    this.componentDidMount();
  };

  mostrarError() {
    return (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{this.state.error}</p>
      </Message>
    );
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          this.mostrarError()
        ) : (
          <>
            {this.state.mostrarMensajeDeEstado && (
              <Message
                positive
                onDismiss={this.manejarProblemas}
                header="!Solicitud Aceptada!"
                content={this.state.mensajeDeEstado}
              ></Message>
            )}
            <Table celled className="tarjeta-tabla">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Nombre y Apellido
                  </Table.HeaderCell>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Detalle
                  </Table.HeaderCell>
                  <Table.HeaderCell className="cabeceras-tabla">
                    Aplicación
                  </Table.HeaderCell>

                  <Table.HeaderCell className="cabeceras-tabla">
                    Acción
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.filasEncontradas &&
                  this.state.filasEncontradas.map((value) => (
                    <Table.Row key={value.id}>
                      <Table.Cell className="bordes-tabla">
                        <Label className="nombre">{value.nombre}</Label>
                        <br></br>
                        <Label className="email">{value.email}</Label>
                      </Table.Cell>

                      <Table.Cell className="bordes-tabla">
                        <div> {value.razon}</div>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        <div> {value.aplicacion}</div>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        <Button
                          disabled={this.state.estaCargando}
                          positive
                          onClick={() => this.otorgarAcceso(value)}
                        >
                          Otorgar Acceso
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell
                    colSpan="4"
                    className="no-border"
                  ></Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </>
        )}
      </div>
    );
  }
}
export default SolicitudesPendientes;
