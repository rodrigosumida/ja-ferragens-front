import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import AppRoutes from "./routes";
import GlobalStyles from "./GlobalStyles";

import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Header />
          <AppRoutes />
          <GlobalStyles />
        </Router>
      </PersistGate> 
    </Provider>
  );
}

export default App;
