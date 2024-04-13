import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider, { AuthContext } from "./Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
