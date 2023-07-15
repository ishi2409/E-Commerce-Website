import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import { Provider } from "react-redux";
import store,{persistor} from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from "redux-persist/integration/react";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <AlertProvider template={AlertTemplate} {...options} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
    </PersistGate>
  </Provider>
);
