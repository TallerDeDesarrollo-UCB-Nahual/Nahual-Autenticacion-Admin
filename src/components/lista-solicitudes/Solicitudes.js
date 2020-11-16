import React, { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import Navbar from "./Navbar";
import ModalOtorgarAcceso from '../otorgar-acceso/ModalOtorgarAcceso'
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
      <Navbar/>
      <ModalOtorgarAcceso/>
      <br/>
      <Container style={{ marginTop: 120 }}>
        <Tab panes={pestañas} />
      </Container>
    </>
  );
};
export default Solicitudes;