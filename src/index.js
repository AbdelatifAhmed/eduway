import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import FacultyProvider from "./Components/facultyContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProvider>
      <FacultyProvider>
        <App />
      </FacultyProvider>
    </AuthProvider>
  </Router>
);
