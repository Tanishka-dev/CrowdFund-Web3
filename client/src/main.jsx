import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { StateContextProvider } from "./context";
import { Sepolia } from "@thirdweb-dev/chains";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <ThirdwebProvider
      activeChain={Sepolia}
      clientId="182d34ff0093d6eb1a234a3d423a3b47"
   >
      <Router>
         <StateContextProvider>
            <App />
         </StateContextProvider>
      </Router>
   </ThirdwebProvider>
);
