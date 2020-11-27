import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dimmer, Loader } from "semantic-ui-react";
import Axios from "axios";
import Solicitudes from "../lista-solicitudes/Solicitudes";
import NoAutorizado from "./NoAutorizado.js";

const ValidarAutorizacion = () => {
	const { user: usuario } = useAuth0();
	const [estado, cambiarEstado] = useState({
		validado: false,
		mostrarIconoCargando: true
	});
	useEffect(() => {
		verificarAutorizacion();
		// eslint-disable-next-line
	}, []);
	const verificarAutorizacion = () => {
		const SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS =
			process.env.REACT_APP_SOLICITAR_ACCESO_URL;
		const datos = JSON.stringify({
			nombre: usuario.name,
			email: usuario.email,
			aplicacion: "Admin"
		});
		Axios.post(
			`${SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS}verificarAcceso`,
			datos,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then((respuesta) => {
				cambiarEstado({
					validado: respuesta.data.data,
					mostrarIconoCargando: false
				});
			})
			.catch((error) => {
				cambiarEstado({
					mostrarBotonDeCarga: false
				});
				alert("Hay un error en la base de datos, status: " + error.status);
			});
	};

	function iconoDeCarga() {
		return (
			estado.mostrarIconoCargando === true && (
				<Dimmer active inverted>
					<Loader>Verificando Acceso...</Loader>
				</Dimmer>
			)
		);
	}
	return (
		<div>
			{iconoDeCarga()}
			{estado.validado ? <Solicitudes /> : <NoAutorizado />}
		</div>
	);
};

export default ValidarAutorizacion;
