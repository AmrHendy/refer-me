import React from "react";

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import ProfileNavbar from "../layout/ProfileNavbar";
import ProfileCard from "../layout/ProfileCard"
import { connect } from "react-redux";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginPage/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
