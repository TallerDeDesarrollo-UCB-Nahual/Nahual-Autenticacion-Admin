import React, { Component } from "react";
import { Button, Label, Message, Table } from "semantic-ui-react";
import "../../public/Stylesheets/Table.css";

const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;

class SolicitudesRechazadas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        solicitudes: [],
        error: ""
        };
        this.props.mostrarCargando(true);
    }

    obtenerSolicitudes() {
        fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}api/usuariosRechazados`)
          .then((respuesta) => {
            return respuesta.json();
          })
          .then((respuesta) => {
            this.setState({
              solicitudes: respuesta.data
            });
            this.props.mostrarCargando(false);
          })
          .catch((error) => {
            this.setState({
              error: "Problema al obtener los datos."
            });
            this.props.mostrarCargando(false);
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

    eliminarSolicitud=async(value)=>{
      this.setState({isLoading:true})
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      };
      try {
        var res = await fetch(`${SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL}api/usuariosRechazados/${value.id}`,{method:'DELETE'})
      } catch (error) {
        console.log(error);
      }
      this.setState({isLoading:false})
      this.componentDidMount()
    }

    componentDidMount() {
        this.obtenerSolicitudes();
    }

    render() {
        return (
          <div>
            {this.state.solicitudes.length === 0 ? (
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
                        Motivo
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
                            <Label className="email">{solicitud.correo}</Label>
                          </Table.Cell>
                          <Table.Cell className="bordes-tabla">
                            <Button disabled={this.state.isLoading} negative onClick={()=>this.eliminarSolicitud(solicitud)}>Eliminar Solicitud</Button>
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

export default SolicitudesRechazadas;