import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dimmer, Loader } from "semantic-ui-react";
import Axios from "axios";
import NahualTable from "../lista-solicitudes/Tabla";

const ValidarAutorizacion = () => {
	const { user: usuario } = useAuth0();
	const [state, setState] = useState({
		validado: false,
		mostrarIconoCargando: true
	});
	useEffect(() => {
		verificarAutotizacion();
		// eslint-disable-next-line
	}, []);
	const verificarAutotizacion = () => {
		const SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS =
			process.env.REACT_APP_API_ACCESO_URL;
		const datos = JSON.stringify({
			nombre: usuario.name,
			email: usuario.email,
			aplicacion: "Admin"
    });
    
		Axios.post(
			`${SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS}/verificarAcceso`,
			datos,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then((respuesta) => {
				console.log(respuesta.data);
				setState({
					validado: respuesta.data.data,
					mostrarIconoCargando: false
				});
			})
			.catch((error) => {
				setState({
					mostrarBotonDeCarga: false
				});
				alert("Hay un error en la base de datos, status: " + error.status);
			});
	};

	function iconoDeCarga() {
		return (
			state.mostrarIconoCargando === true && (
				<Dimmer active>
					<Loader>Verificando Acceso...</Loader>
				</Dimmer>
			)
		);
	}
	return (
		<div>
			{iconoDeCarga()}
			{state.validado ? <NahualTable /> : <h1>NO TIENES ACCESO</h1>}
		</div>
	);
};

export default ValidarAutorizacion;
