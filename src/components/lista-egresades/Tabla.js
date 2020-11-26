import React, { Component } from 'react'
import { Label, Button, Message, Table, Search } from 'semantic-ui-react'
import '../../public/Stylesheets/Table.css';

class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false
    }
  }

  obtenerSolicitudes() {
    fetch(`http://localhost:8000/peticiones`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        console.log(dat);
        this.setState({
          api: dat.data,
          filasEncontradas: dat.data
        });
      })
  }

  componentDidMount() {
    this.obtenerSolicitudes();
  }


  render() {
    return (
      <div>
        <div className="tabla">
          <p className="titulo">Lista de Solicitudes</p>
          <div className="linea"></div>
          <div>
            {this.state.mostrarMensajeDeEstado ?
              <Message
                positive
                onDismiss={this.manejarProblemas}
                header='Registro exitoso!'
                content={this.state.mensajeDeEstado}
              ></Message>
              :
              <p></p>
            }
          </div>
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Detalle</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Aplicación</Table.HeaderCell>
                
                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.filasEncontradas.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
                    <Label className="nombre">{value.name}</Label><br></br>
                    <Label className="email">{value.email}</Label>
                  </Table.Cell >
                  
                  <Table.Cell className="bordes-tabla">
                    <div> {value.reason}</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <div> {value.resourcePetition}</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Button>dummy</Button>
                  </Table.Cell>
                    
                  
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </div>
      </div>)

  }

}
export default Nahual_Table