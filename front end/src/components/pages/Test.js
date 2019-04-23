import React from "react";
import ProfileNavbar from "../layout/ProfileNavbar";
import ProfileCard from "../layout/ProfileCard"
import { connect } from "react-redux";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ProfileNavbar/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
