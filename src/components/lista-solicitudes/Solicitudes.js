import React from 'react'
import { Container, Tab } from 'semantic-ui-react'
import Navbar from './Navbar'
import SolicitudesAprobadas from './SolicitudesAprobadas'
const pestañas = [
  { menuItem: { key: 'pendientes', icon: 'time', content: 'Solicitudes pendientes' }, render: () => <Tab.Pane> <SolicitudesAprobadas/> </Tab.Pane> },
  { menuItem: { key: 'pendientes', icon: 'check circle', content: 'Solicitudes Aprobadas' }, render: () => <Tab.Pane> <SolicitudesAprobadas/> </Tab.Pane> },
]
export const Solicitudes = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Tab panes={pestañas} />
      </Container>
    </>
  )
}
