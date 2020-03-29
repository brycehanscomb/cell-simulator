import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

const mountNode = document.getElementById("root");

if (!mountNode) {
  alert(
    "ಠ╭╮ಠ Whoops! \n\n Looks like there is nowhere to actually put the app. \n\n Please check your HTML and re-insert the disk to continue..."
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    mountNode
  );
}
