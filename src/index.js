import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<Auth0Provider
		domain="dev-gl-221m2.us.auth0.com"
		clientId="u0vos7IYdq3wkqMjAI3pQ6YeuWr3RNHL"
		//redirectUri={window.location.origin}
		useRefreshTokens={true}
		cacheLocation="localstorage"
	>
		<Router>
			<App />
		</Router>
	</Auth0Provider>,
	document.getElementById("root")
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
	"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
serviceWorker.unregister();
