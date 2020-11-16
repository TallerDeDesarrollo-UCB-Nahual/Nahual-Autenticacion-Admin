import React, { Component } from "react";
import { Label, Message, Table } from "semantic-ui-react";
import "../../public/Stylesheets/Table.css";
import { PermisoEtiqueta } from "./PermisoEtiqueta";

const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;
export class SolicitudesAprobadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudes: [],
      error: ""
    };
    this.props.mostrarCargando(true);
    this.quitarPermiso = this.quitarPermiso.bind(this);
    this.asignarError = this.asignarError.bind(this);
  }
  obtenerSolicitudes() {
    fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}usuariosConAcceso`)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((respuesta) => {
        this.setState({
          solicitudes: respuesta.data
        });
        this.props.mostrarCargando(false);
      })
      .catch(() => {
        this.setState({
          error: "Problema al obtener los datos."
        });
        this.props.mostrarCargando(false);
      });
  }

  asignarError(error) {
    this.setState({
      error: error
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

  listaVacia() {
    return this.state.error ? (
      <Message
        icon="warning sign"
        warning
        header={"Error, problema al obtener los datos."}
      />
    ) : (
      <Message
        icon="warning sign"
        warning
        header={"No hay solicitudes aprobadas."}
      />
    );
  }

  componentDidMount() {
    this.obtenerSolicitudes();
  }

  mostrarPermisos(solicitud) {
    var permisos = [];
    solicitud.permisoNahual &&
      permisos.push({
        aplicacion: "Nahual",
        color: "green"
      });
    solicitud.permisoEmpresas &&
      permisos.push({
        aplicacion: "Empresas",
        color: "grey"
      });
    solicitud.permisoAdmin &&
      permisos.push({
        aplicacion: "Admin",
        color: "blue"
      });
    return permisos.map((permiso) => (
      <PermisoEtiqueta
        asignarError={this.asignarError}
        key={permiso.aplicacion}
        solicitud={solicitud}
        permiso={permiso}
        quitarPermiso={this.quitarPermiso}
      />
    ));
  }

  quitarPermiso(solicitudNueva) {
    const nuevaListaDeSolicitudes = this.state.solicitudes;
    const solicitudIndex = this.state.solicitudes.findIndex(
      (solicitud) => solicitud.email === solicitudNueva.email
    );
    nuevaListaDeSolicitudes[solicitudIndex] = solicitudNueva;
    this.setState({ solicitudes: nuevaListaDeSolicitudes });
  }

  render() {
    return (
      <div>
        {this.state.solicitudes.length === 0 || this.state.error ? (
          this.listaVacia()
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
                    Permisos
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.solicitudes &&
                  this.state.solicitudes.map((solicitud) => (
                    <Table.Row key={solicitud.email}>
                      <Table.Cell className="bordes-tabla">
                        <Label className="nombre">{solicitud.nombre}</Label>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        <Label className="email">{solicitud.email}</Label>
                      </Table.Cell>
                      <Table.Cell className="bordes-tabla">
                        {this.mostrarPermisos(solicitud)}
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
