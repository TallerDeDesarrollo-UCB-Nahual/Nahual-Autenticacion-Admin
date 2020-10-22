import React, { Component } from 'react'
import {Button } from 'semantic-ui-react'
import {Form, Input, TextArea, Field } from 'semantic-ui-react-form-validator';
import '../../public/Stylesheets/FormularioDeSolicitud.css'

export default class EditarEgresades extends Component {

    constructor(){
        super();
        this.state = {
            correo: '',
            nombre: '',
            motivo: ''
        }
    }

    onChangeInput = (e, {value, name}) => {
        let valor = this.state[e.target.name];
        let nombre = e.target.name;
        this.setState({[nombre]: value})
        valor = value;
        this.state[e.target.name] = valor;
    }

    enConfirmacion = (evento) => {
        evento.preventDefault();
        //redirigir
    }

    
    render() {
        return (
            <Form id="myForm" className="ui form" onSubmit={this.enConfirmacion}>
                <Input
                    name = "nombre" 
                    validators={['required','matchRegexp:^[A-Za-z ]+$']} 
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']} 
                    value = {this.state.nombre}
                    id='form-input-control-first-name'
                    label='Nombre completo'
                    placeholder='Nombre completo'
                    width={16}
                    onChange={this.onChangeInput}
                />
                <Input
                    name="correo"
                    type="email"
                    id='form-input-control-error-email'
                    label='Correo'
                    placeholder='ejemplo@****.com'
                    validators={['required']} 
                    errorMessages={['Este campo es requerido']} 
                    value = {this.state.correo}
                    width={16}
                    onChange={this.onChangeInput}
                />
                <TextArea
                    name = "motivo" 
                    type="text"
                    id='form-textarea-control-opinion'
                    label='Motivo'
                    placeholder='Motivo'
                    validators={['required']} 
                    errorMessages={['Este campo es requerido']} 
                    value = {this.state.motivo}
                    onChange={this.onChangeInput}
                />
                <Button className="boton_confirm" onClick={() => window.location = "http://localhost:3000/"}>Confirmar</Button>
            </Form>
        )
    }
}