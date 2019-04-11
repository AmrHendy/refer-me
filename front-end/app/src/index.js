import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./helpers/store";
import App from "./components/layout/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
