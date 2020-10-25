import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import {Button } from 'semantic-ui-react'
import {Form, Input, TextArea, Field } from 'semantic-ui-react-form-validator';
import CryptoJS from 'crypto-js';
import '../../public/Stylesheets/FormularioDeSolicitud.css'


export default class FormularioDeSolicitud extends Component {

    constructor(props){
        super();
        this.state = {
            nombre: "",
            correo: "",
            origen: "",
            motivo: "",
            permitido: true
        }
    }

    componentDidMount(){
        try {
            let params = (new URL(window.location.href)).searchParams;
            let searchParams = new URLSearchParams(params);
            var datos = searchParams.get('datos');

            var AES = require("crypto-js/aes");
            var desencriptado = JSON.parse(AES.decrypt(datos, 'Nahual123').toString(CryptoJS.enc.Utf8));
            this.setState({nombre:desencriptado.nombre});
            this.setState({origen:desencriptado.origen});
            
            
        } catch (error) {
            this.setState({permitido: false});
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
        console.log(this.state);
    }

    
    render() {
        if((this.state.permitido)){      
            return (<Form id="myForm" className="ui form" onSubmit={this.enConfirmacion}>
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
        else{
            return(
                <Redirect to="/error"/>
            )
        }
    }
}