import React, { Component } from "react";
import logo from "../../public/imagenes/logo-proyecto-nahual.webp";
import "../../public/Stylesheets/Navbar.css";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const {
    user: usuario,
    isAuthenticated: estaAutenticado,
    logout: cerrarSesion
  } = useAuth0();
  return (
    <>
      <Menu fixed="top">
        <Menu.Item>
          <Image rounded size={"small"} src={logo} />
        </Menu.Item>
        {estaAutenticado && (
          <>
            <Menu.Item position="right">
              <Dropdown
                trigger={
                  <span>
                    <Image src={usuario.picture} avatar />
                    {usuario.name}
                  </span>
                }
                options={[
                  {
                    key: "cerrar-sesion",
                    text: "Cerrar Sesión",
                    icon: "sign out"
                  }
                ]}
                pointing="top left"
                onChange={() => cerrarSesion()}
              />
            </Menu.Item>
            <Menu.Item></Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
}
export default Navbar;
