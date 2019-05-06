import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./helpers/store";
import App from "./containers/App";
import LoginPage from "./components/pages/Sign in/LoginPage";
import RegisterPage from "./components/pages/Sign up/RegisterPage";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import HomePage from "./components/pages/Home/HomePage";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/home" component={HomePage} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
