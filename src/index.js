import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./Component/App";

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
