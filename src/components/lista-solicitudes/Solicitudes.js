import React, { useState } from "react";
import { Container, Tab } from "semantic-ui-react";
import Navbar from "./Navbar";
import SolicitudesAprobadas from "./SolicitudesAprobadas";
import SolicitudesPendientes from "./SolicitudesPendientes";

export const Solicitudes = () => {
  const [
    estaCargandoSolicitudesPendientes,
    setEstaCargandoSolicitudesPendientes
  ] = useState(true);
  const [
    estaCargandoSolicitudesAprobadas,
    setEstaCargandoSolicitudesAprobadas
  ] = useState(true);
  const pestañas = [
    {
      menuItem: {
        key: "solicitudesPendientes",
        icon: "time",
        content: "Solicitudes pendientes"
      },
      render: () => (
        <Tab.Pane loading={estaCargandoSolicitudesPendientes}>
          <SolicitudesPendientes
            estableserCargando={(cargando) =>
              setEstaCargandoSolicitudesPendientes(cargando)
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
        <Tab.Pane loading={estaCargandoSolicitudesAprobadas}>
          <SolicitudesAprobadas
            estableserCargando={(cargando) =>
              setEstaCargandoSolicitudesAprobadas(cargando)
            }
          />
        </Tab.Pane>
      )
    }
  ];
  return (
    <>
      <Navbar />
      <Container>
        <Tab panes={pestañas} />
      </Container>
    </>
  );
};
