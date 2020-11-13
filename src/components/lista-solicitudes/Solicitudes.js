import React, { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import Navbar from "./Navbar";
import ModalAcceso from '../otorgar-acceso/ModalAcceso'
import SolicitudesAprobadas from "./SolicitudesAprobadas";
import SolicitudesPendientes from "./SolicitudesPendientes";
import SolicitudesRechazadas from "./SolicitudesRechazadas";

const Solicitudes = () => {
  const [
    cargandoSolicitudesPendientes,
    modificarCargandoSolicitudesPendientes
  ] = useState(true);
  const [
    cargandoSolicitudesAprobadas,
    modificarCargandoSolicitudesAprobadas
  ] = useState(true);
  const [
    cargandoSolicitudesRechazadas,
    modificarCargandoSolicitudesRechazadas
  ] = useState(true);

  const pestañas = [
    {
      menuItem: {
        key: "solicitudesPendientes",
        icon: "time",
        content: "Solicitudes pendientes"
      },
      render: () => (
        <Tab.Pane loading={cargandoSolicitudesPendientes}>
          <SolicitudesPendientes
            mostrarCargando={(cargando) =>
              modificarCargandoSolicitudesPendientes(cargando)
            }
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: "solicitudesAprovadas",
        icon: "check circle",
        content: "Solicitudes Aprobadas"
      },
      render: () => (
        <Tab.Pane loading={cargandoSolicitudesAprobadas}>
          <SolicitudesAprobadas
            mostrarCargando={(cargando) =>
              modificarCargandoSolicitudesAprobadas(cargando)
            }
          />
        </Tab.Pane>
      )
    },
    {
      menuItem:{
        key: "solicitudesRechazadas",
        icon: "times circle",
        content: "Solicitudes Rechazadas"
      },
      render: () => (
        <Tab.Pane loading={cargandoSolicitudesRechazadas}>
          <SolicitudesRechazadas
            mostrarCargando={(cargando) =>
              modificarCargandoSolicitudesRechazadas(cargando)
            }
          />
        </Tab.Pane>
      )
    }
  ];
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <Container style={{ marginTop: 120, marginBottom: "20px" }}>
=======
      <ModalAcceso ></ModalAcceso>
      <br></br>
      <Container style={{ marginTop: 120 }}>
>>>>>>> 6e3ca7b... Añadido todo lo referente al modal de otorgar acceso, boton, mensajes de error y exito, form  de acceso, conexion con backend etc.
        <Tab panes={pestañas} />
      </Container>
    </>
  );
};
export default Solicitudes;