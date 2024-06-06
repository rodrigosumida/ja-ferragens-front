import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";

import AppRoutes from "./routes";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <GlobalStyles />
    </Router>
  );
}

export default App;
