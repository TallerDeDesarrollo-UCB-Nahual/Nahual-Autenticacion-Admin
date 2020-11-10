import React, { Component } from 'react';
import logo from '../../public/imagenes/logo.png';
import '../../public/Stylesheets/Navbar.css';

export default class Navbar extends Component {

    render() {
        return (
            <div className="menu">
                <img src={logo} className="logo" alt="logo"></img>
                <label className="nav-titulo">Gestor de Solicitudes</label>
            </div>
        )
    }
}