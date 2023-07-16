import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GameProvider from "./provider/GameProvider/index.tsx";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
);
