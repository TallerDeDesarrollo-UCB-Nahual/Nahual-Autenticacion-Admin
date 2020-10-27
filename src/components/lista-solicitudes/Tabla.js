import React, { Component } from 'react'
import { Label, Button, Message, Table } from 'semantic-ui-react'
import '../../public/stylesheets/Table.css';
import Navbar from './Navbar';

class Nahual_Table extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false,
      isLoading:false
    }
  }

  obtenerSolicitudes() {
    fetch(`https://nahual-authentication-api.herokuapp.com/api/solicitudes`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        this.setState({
          api: dat.data,
          filasEncontradas: dat.data
        });
      })
  }


  componentDidMount() {
    this.obtenerSolicitudes();
  }

  mostrarMensaje() {
    this.setState({ mostrarMensajeDeEstado: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  otorgarAcceso=async(value)=>{
    this.setState({isLoading:true})
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    };
    try {
      var res = await fetch(`https://nahual-authentication-api.herokuapp.com/api/otorgarAcceso`,requestOptions)
      console.log(res);
      this.mostrarMensaje();
      this.setState({mensajeDeEstado:`Se le otorgo el acceso al usuario ${value.email}`})
      res = await fetch(`https://nahual-authentication-api.herokuapp.com/api/solicitudes/${value.id}`,{method:'DELETE'})
    } catch (error) {
      console.log(error);
    }
    this.setState({isLoading:false})
    this.componentDidMount()
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="tabla">
          <p className="titulo">Lista de Solicitudes</p>
          <div className="linea"></div>
          <div>
            {this.state.mostrarMensajeDeEstado &&
              <Message
                positive
                onDismiss={this.manejarProblemas}
                header='Solicitud Aceptada!'
                content={this.state.mensajeDeEstado}
              ></Message>
            }
          </div>
          <br/><br />
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
              {this.state.filasEncontradas && this.state.filasEncontradas.map((value) => (
                <Table.Row key={value.id}>
                  <Table.Cell className="bordes-tabla">
                    <Label className="nombre">{value.nombre}</Label><br></br>
                    <Label className="email">{value.email}</Label>
                  </Table.Cell >
                  
                  <Table.Cell className="bordes-tabla">
                    <div> {value.razon}</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <div> {value.aplicacion}</div></Table.Cell>
                  <Table.Cell className="bordes-tabla">
                  <Button disabled={this.state.isLoading} positive onClick={()=>this.otorgarAcceso(value)}>Otorgar Accesso</Button>
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