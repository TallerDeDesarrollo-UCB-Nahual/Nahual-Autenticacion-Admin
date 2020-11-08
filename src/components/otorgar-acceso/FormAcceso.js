import React, { Component } from 'react'
import {Button } from 'semantic-ui-react'
import {Form, Input} from 'semantic-ui-react-form-validator'


class FormAcceso extends Component{
  constructor(){
    super();
    this.state = {
        nombre: "",
        correo: "",
        exito: null
    }
 }
  render() {
    return (
      <Form id="myForm">
        <Input 
          name = "nombre" 
          validators={['required','matchRegexp:^[A-Za-z ]+$']} 
          errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
          id='form-acceso'
          label='Nombre completo'
          placeholder='Nombre completo'
          width={16} 
        />
        <Input
          name="correo"
          type="email"
          id='form-input-control-error-email'
          label='Correo'
          placeholder='ejemplo@****.com'
          validators={['required']} 
          errorMessages={['Este campo es requerido']} 
          width={16}
        />
        <Button floated='right' type='submit'>Confirmar</Button>
      </Form>
    )
  }
}

export default FormAcceso;