import React, { Component } from 'react'
import {Button, Dropdown} from 'semantic-ui-react'
import {Form, Input} from 'semantic-ui-react-form-validator'


class FormAcceso extends Component{
  constructor(){
    super();
    this.state = {
        nombre: "",
        correo: "",
        aplicacion:"",
        exito: null
    }
  }

  cambioEnInput = (e, {value, name}) => {
    let valor = this.state[e.target.name];
    let nombre = e.target.name;
    this.setState({[nombre]: value})
    valor = value;
    this.state[e.target.name] = valor;
  }

  enConfirmacion = (evento) => {
      evento.preventDefault();
      var estadoDepurado = { 
          nombre: this.state.nombre,
          email: this.state.correo,
          aplicacion: this.state.aplicacion
      }
      console.log(estadoDepurado);
  }
  getAplicacion = (evento, {valor}) => {
    console.log(valor);
    let nombreAplicacion = evento.target.textContent;
    console.log(nombreAplicacion);
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
          name = "nombre" 
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
          name="correo"
          value = {this.state.correo}
          type="email"
          id='form-input-control-error-email'
          label='Correo'
          placeholder='ejemplo@****.com'
          validators={['required']} 
          errorMessages={['Este campo es requerido']} 
          width={16}
          onChange={this.cambioEnInput}
        />
        <Dropdown placeholder='Aplicación' fluid multiple selection options={opcionesAplicacion}
        onChange={this.getAplicacion}
        />
        <Button floated='right' type='submit' onSubmit={this.enConfirmacion}>Otorgar Acceso</Button>
      </Form>
    )
  }
}

export default FormAcceso;