import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import FacultyProvider from "./Components/facultyContext";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

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
