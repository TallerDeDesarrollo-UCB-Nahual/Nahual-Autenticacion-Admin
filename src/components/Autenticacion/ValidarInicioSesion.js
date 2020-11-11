import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import IniciarSesion from "./IniciarSesion";
import ValidarAutorizacion from "./ValidarAutorizacion";

const ValidarInicioSesion = () => {
  const { isAuthenticated: estaAutenticado } = useAuth0();
  return (
  estaAutenticado ? <ValidarAutorizacion/> : <IniciarSesion/>
  );
};

export default ValidarInicioSesion;