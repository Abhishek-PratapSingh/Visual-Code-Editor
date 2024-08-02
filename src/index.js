import "tailwindcss/tailwind.css";
import React from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./store";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </Provider>
   , document.getElementById("root")
);
reportWebVitals();
