import React, { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import Navbar from "./Navbar";
import ModalAcceso from '../otorgar-acceso/ModalAcceso'
import SolicitudesAprobadas from "./SolicitudesAprobadas";
import SolicitudesPendientes from "./SolicitudesPendientes";

export const Solicitudes = () => {
  const [
    cargandoSolicitudesPendientes,
    modificarCargandoSolicitudesPendientes
  ] = useState(true);
  const [
    cargandoSolicitudesAprobadas,
    modificarCargandoSolicitudesAprobadas
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
    }
  ];
  return (
    <>
      <Navbar />
      <ModalAcceso ></ModalAcceso>
      <br></br>
      <Container>
        <Tab panes={pestañas} />
      </Container>
    </>
  );
};
