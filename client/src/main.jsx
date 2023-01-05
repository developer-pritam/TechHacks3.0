import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { WalletProvider } from "./context/WalletContext";
import "./index.css";

ReactDOM.render(
  <WalletProvider>
    <App />
  </WalletProvider>,
  document.getElementById("root")
);
