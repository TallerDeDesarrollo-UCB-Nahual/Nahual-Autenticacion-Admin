import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import {Button } from 'semantic-ui-react'
import {Form, Input, TextArea } from 'semantic-ui-react-form-validator';
import CryptoJS from 'crypto-js';
import axios  from 'axios';
import MensajeResultante from './tipo-mensaje/MensajeResultante.js';

const rutaSolicitudes = 'https://nahual-authentication-api.herokuapp.com/api/solicitudes';

function prepararEstadoAPartirDe(desencriptado){
    return ({
        nombre: desencriptado.nombre,
        correo: desencriptado.correo,
        origen: desencriptado.origen,
        redirigirA: desencriptado.redirigir,
        motivo: '',
        permitido : true,
        exito: null
    });
}

export default class FormularioDeSolicitud extends Component {
   
    constructor(props){
        
        super();
        this.state = {
            nombre: "",
            correo: "",
            origen: "",
            motivo: "",
            redirigirA: "",  
            permitido: true,
            exito: null
        }
    }

    componentDidMount(){
        try {
            let params = (new URL(window.location.href)).searchParams;
            let searchParams = new URLSearchParams(params);
            var datos = searchParams.get('datos');

            var AES = require("crypto-js/aes");
            var desencriptado = JSON.parse(AES.decrypt(datos, 'Nahual123').toString(CryptoJS.enc.Utf8));
            this.setState(prepararEstadoAPartirDe(desencriptado));   
            
        } catch (error) {
            this.setState({permitido:false});
        }
    }

    onChangeInput = (e, {value, name}) => {
        let valor = this.state[e.target.name];
        let nombre = e.target.name;
        this.setState({[nombre]: value})
        valor = value;
        this.state[e.target.name] = valor;
    }

    enCancelacion = (evento) =>{
        evento.preventDefault();
        this.setState({ exito: null }); 
        window.location.replace(this.state.redirigirA);
    }

    enConfirmacion = (evento) => {
        evento.preventDefault();
        var estadoDepurado = { 
            nombre: this.state.nombre,
            email: this.state.correo,
            razon: this.state.motivo,
            aplicacion: this.state.origen
        }
        axios.post(rutaSolicitudes, estadoDepurado)
        .then(function (respuesta){
            this.setState({exito:true});
            setTimeout(() => { this.setState({ exito: null }); window.location.replace(this.state.redirigirA);}, 4000); 
            
        }.bind(this))
        .catch(function(error){
            this.setState({exito:false});
            console.log(error);
            setTimeout(() => { this.setState({ exito: null }); }, 5000); 
        }.bind(this));
    }
    
    render() {
        if((this.state.permitido)){      
            return (
                <div>
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
                        disabled
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
                        disabled
                        onChange={this.onChangeInput}
                    />
                    <TextArea
                        name = "motivo" 
                        type="text"
                        id='form-textarea-control-opinion'
                        label='Motivo'
                        placeholder='Cuéntenos su razón para ingresar a la aplicación...'
                        validators={['required']} 
                        errorMessages={['Este campo es requerido']} 
                        value = {this.state.motivo}
                        onChange={this.onChangeInput}
                    />
                    <Button positive type='submit' className="boton_confirm" onSubmit={this.enConfirmacion}>Confirmar</Button>
                    <Button negative floated="right" onClick={this.enCancelacion} CausesValidation="false">Cancelar</Button>
            
                </Form>
                {(this.state.exito === true) && (
                <MensajeResultante encabezadoDelMensaje= "Solicitud exitosa" cuerpoDelMensaje="Espere por favor hasta que se apruebe su solicitud, volverá a la página anterior" colorDeFondo="green"/>)}
                {(this.state.exito === false) && (
                <MensajeResultante encabezadoDelMensaje= "Solicitud no exitosa" cuerpoDelMensaje="Hubo un error al momento de enviar, intente de nuevo más tarde" colorDeFondo="red"/>)}
            </div>
            )     
        }
        else{
            return(
                <Redirect to="/error"/>
            )
        }
    }
}