import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")).render(
  // Utilisation de createRoot
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
