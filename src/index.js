import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider, { User } from "./Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
      <Router>
  <UserProvider>
        <App />
  </UserProvider>
      </Router>
);
