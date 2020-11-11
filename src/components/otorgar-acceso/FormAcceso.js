import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react-form-validator'
import axios  from 'axios';

class FormAcceso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      aplicaciones: [],
      exito: null
    }
  }

  cambioEnInput = (e, { value, name }) => {
    this.setState({ [name]: value })
  }

  enConfirmacion = (evento) => {
    var length = this.state.aplicaciones.length;
    for (var i = 0; i < length; i++)
    {
      evento.preventDefault();
      var estadoDepurado = {
        nombre: this.state.nombre,
        email: this.state.correo,
        aplicacion: this.state.aplicaciones[i]
    }
    axios({
      method: "post",
      url: 'http://localhost:3001/otorgarAcceso',
      headers: { "Content-Type": "application/json" },
      data: estadoDepurado
    })
      /*.then(response => this.props.añadirAcceso(estadoDepurado))*/
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('Hubo un error!', error);
      });
    }
  }

  render() {
    const opcionesAplicacion = [
      { key: 'Admin', text: 'Admin', value: 'Admin' },
      { key: 'Nahual', text: 'Nahual', value: 'Nahual' },
      { key: 'Empresas', text: 'Empresas', value: 'Empresas' },
    ]
    return (
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
        <p><b>Aplicaciones</b></p>
        <Dropdown
          compact
          name='aplicaciones'
          placeholder='Aplicaciones'
          validators={['required']}
          fluid
          multiple selection
          options={opcionesAplicacion}
          onChange={this.cambioEnInput}
        />
        <br></br>
        <Button floated='right' color='red' onClick={this.props.cerrarModal}>Cancelar</Button>
        <Button floated='right' type='submit' onSubmit={this.enConfirmacion}>Otorgar Acceso</Button>
      </Form>
    )
  }
}

export default FormAcceso;