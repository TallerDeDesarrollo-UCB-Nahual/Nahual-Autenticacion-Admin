import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import Navbar from "../lista-solicitudes/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
const IniciarSesion = (props) => {
  const { loginWithRedirect: iniciarSesion } = useAuth0();
	return (
		<>
			<Navbar />
			<Segment vertical textAlign="center" style={{ marginTop: "20vh" }}>
				<Header icon textAlign="center" size="huge">
					<Icon name="hand point down outline" />
					¡Bienvenido!
					<Header.Subheader>
						Para continuar debe iniciar sesion.
					</Header.Subheader>
				</Header>
				<Button
					size="big"
					style={{ marginTop: "30px", backgroundColor: "#87D734" }}
          onClick={()=>iniciarSesion()}
				>
					Iniciar Sesion
					<Icon name="right arrow" />
				</Button>
			</Segment>
		</>
	);
};

export default IniciarSesion;
