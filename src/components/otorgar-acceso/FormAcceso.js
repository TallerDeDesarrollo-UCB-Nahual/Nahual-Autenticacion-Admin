import React, { Component } from 'react'
import { Button, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react-form-validator'
import axios  from 'axios';
import MensajeAcceso from './mensaje-acceso/MensajeAcceso'

/*const SERVICIO_DE_SOLICITAR_ACCESO_NAHUAL =
  process.env.REACT_APP_SOLICITAR_ACCESO_URL;*/
class FormAcceso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      aplicacion: "",
      exito: null,
      mostrarBotonDeCarga: false
    }
  }

  cambioEnInput = (e, { value, name }) => {
    this.setState({ [name]: value })
  }

  iconoDeCarga() {
    return (
      this.state.mostrarBotonDeCarga === true && (
        <Dimmer active inverted>
          <Loader inverted>Cargando</Loader>
        </Dimmer>
      )
    );
  }

  enConfirmacion = (evento) => {
      evento.preventDefault();
      var estadoDepurado = {
        nombre: this.state.nombre,
        email: this.state.correo,
        aplicacion: this.state.aplicacion
    }
    this.setState({mostrarBotonDeCarga:true});
    axios({
      method: "post",
      url: 'http://localhost:3001/otorgarAcceso',
      headers: { "Content-Type": "application/json" },
      data: estadoDepurado
    })
      .then(respuesta => {
        this.setState({exito:true});
        this.setState({mostrarBotonDeCarga:false});
        setTimeout(() => { 
          this.props.cerrarModal();
        }, 2500);
      })
      .catch(error => {
        this.setState({exito:false});
        this.setState({mostrarBotonDeCarga:false});
        setTimeout(() => { 
          this.props.cerrarModal();
        }, 2500);
      });
  }

  render() {
    const opcionesAplicacion = [
      { key: 'Admin', text: 'Admin', value: 'Admin' },
      { key: 'Nahual', text: 'Nahual', value: 'Nahual' },
      { key: 'Empresas', text: 'Empresas', value: 'Empresas' },
    ]
    return (
      <div>
         {this.iconoDeCarga()}
         <Form id="myForm" onSubmit={this.enConfirmacion}>
          <Input
            name='nombre'
            value={this.state.nombre}
            validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
            errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
            id='form-acceso'
            label='Nombre completo'
            placeholder='Nombre completo'
            width={16}
            onChange={this.cambioEnInput}
          />
          <Input
            name='correo'
            value={this.state.correo}
            type='email'
            id='form-input-control-error-email'
            label='Correo'
            placeholder='ejemplo@****.com'
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            width={16}
            onChange={this.cambioEnInput}
          />
          <p><b>Aplicación</b></p>
          <Dropdown
            compact
            name='aplicacion'
            placeholder='Aplicacion'
            validators={['required']}
            fluid
            selection
            options={opcionesAplicacion}
            onChange={this.cambioEnInput}
          />
          <br></br>
          <Button floated='right' color='red' onClick={this.props.cerrarModal}>Cancelar</Button>
          <Button floated='right' type='submit' onSubmit={this.enConfirmacion}>Otorgar Acceso</Button>
        </Form>
        {(this.state.exito === true) && (
        <MensajeAcceso encabezadoDelMensaje= "Solicitud exitosa" cuerpoDelMensaje="Acceso otorgado con exito" colorDeFondo="green"/>)}
        {(this.state.exito === false) && (
        <MensajeAcceso encabezadoDelMensaje= "Solicitud no exitosa" cuerpoDelMensaje="Hubo un error al momento de enviar, intente de nuevo más tarde" colorDeFondo="red"/>)}
      </div>

    )
  }
}

export default FormAcceso; 