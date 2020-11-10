import React, { Component } from 'react'
import {Button, Dropdown} from 'semantic-ui-react'
import {Form, Input} from 'semantic-ui-react-form-validator'


class FormAcceso extends Component{
  constructor(){
    super();
    this.state = {
        nombre: "",
        correo: "",
        aplicaciones:[],
        exito: null
    }
  }

  cambioEnInput = (e, {value, name}) => {
    this.setState({[name]: value})
  }

  enConfirmacion = (evento) => {
      evento.preventDefault();
      var estadoDepurado = { 
          nombre: this.state.nombre,
          email: this.state.correo,
          aplicaciones: this.state.aplicaciones
      }
      console.log(estadoDepurado);
  }

  render() {
    const opcionesAplicacion = [
      { key: 'admin', text: 'Admin', value: 'admin' },
      { key: 'nahual', text: 'Nahual', value: 'nahual' },
      { key: 'empresas', text: 'Empresas', value: 'empresas' },
    ]
    return (
      <Form id="myForm" onSubmit={this.enConfirmacion}>
        <Input 
          name = 'nombre'
          value = {this.state.nombre}
          validators={['required','matchRegexp:^[A-Za-z ]+$']} 
          errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
          id='form-acceso'
          label='Nombre completo'
          placeholder='Nombre completo'
          width={16} 
          onChange={this.cambioEnInput}
        />
        <Input
          name='correo'
          value = {this.state.correo}
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
        <Button floated='right'  color = 'red' onClick={this.props.cerrarModal}>Cancelar</Button>
        <Button floated='right' type='submit' onSubmit={this.enConfirmacion}>Otorgar Acceso</Button>
      </Form>
    )
  }
}

export default FormAcceso;