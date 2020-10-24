import React, { Component } from 'react'
import {Button } from 'semantic-ui-react'
import jwt_decode from "jwt-decode";
import {Form, Input, TextArea, Field } from 'semantic-ui-react-form-validator';
import '../../public/Stylesheets/FormularioDeSolicitud.css'

function recuperarDatosDeUsuario(tokenDecodificado, origenDelUsuario){
    let nombreCompleto = tokenDecodificado.given_name + " " + tokenDecodificado.family_name;
    var estadoInicial = {correo: tokenDecodificado.email, nombre: nombreCompleto, motivo: '', origen: origenDelUsuario};
    return estadoInicial;
}

export default class FormularioDeSolicitud extends Component {

    constructor(){
        super();
        this.state = {
            correo: '',
            nombre: '',
            motivo: '',
            origen: ''
        }
    }

    componentDidMount(){
        let params = (new URL(window.location.href)).searchParams;
        let searchParams = new URLSearchParams(params);
        var token = searchParams.get('token');
        var tokenDecodificado = jwt_decode(token);
        this.setState(recuperarDatosDeUsuario(tokenDecodificado, searchParams.get('redirect')));
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
        console.log(this.state);
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
                <Button type='submit' className="boton_confirm" onSubmit={this.enConfirmacion}>Confirmar</Button>
                {/* onClick={() => window.location = "http://localhost:3000/"} */}
            </Form>
        )
    }
}