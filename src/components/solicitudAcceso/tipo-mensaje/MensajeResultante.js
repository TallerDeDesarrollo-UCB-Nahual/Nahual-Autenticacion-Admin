<<<<<<< HEAD
import React, { Component } from 'react'
import {Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../../public/Stylesheets/Mensaje.css';


export class MensajeResultante extends Component {
    render() {
        var colorDeMensaje = this.props.colorDeFondo;
        return (
            <div style={{border:`1px solid ${colorDeMensaje} !important`}} className="centerMessage">
                <Message color={`${colorDeMensaje}`} size='big' style={{
                    color: `${colorDeMensaje}`,border: `${colorDeMensaje}`}}>
                <Message.Header>{this.props.encabezadoDelMensaje}</Message.Header>
                <p>
                    {this.props.cuerpoDelMensaje}
                </p>
                </Message>
            </div>
        )
    }
=======
import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import "../../../public/stylesheets/Mensaje.css";

export class MensajeResultante extends Component {
  render() {
    var colorDeMensaje = this.props.colorDeFondo;
    return (
      <div
        style={{ border: "1px solid `${colorDeMensaje}` !important" }}
        className="centerMessage"
      >
        <Message
          color={`${colorDeMensaje}`}
          size="big"
          style={{
            color: `${colorDeMensaje}`,
            border: `${colorDeMensaje}`
          }}
        >
          <Message.Header>{this.props.encabezadoDelMensaje}</Message.Header>
          <p>{this.props.cuerpoDelMensaje}</p>
        </Message>
      </div>
    );
  }
>>>>>>> 7b861ab... Se agrego la pagina de No acceso, y el boton de cerrar sesion
}

MensajeResultante.propTypes = {
  todo: PropTypes.object.isRequired
};

export default MensajeResultante;
