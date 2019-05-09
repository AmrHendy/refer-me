import React from "react";

import LoginPage from "./Sign in/LoginPage"
import RegisterPage from "./Sign up/RegisterPage"
import { connect } from "react-redux";
import Sidenav from "./Home/sidenav";
import OfficeCard from "./Home/OfficeCard";
import HomePage from "./Home/HomePage";
import TopNav from "../layout/topnav";
import EmployeeCard from "./Home/EmployeeCard";
import ProfileCard from "./Profile/ProfileCard";
import PostionCard from "./Profile/PositionCard";
import ProfilePage from "./Profile/ProfilePage";
import RequestNav from "./Requests/RequestNav";
import RequestCard from "./Requests/RequestCard";
import RequestModal from "./Home/RequestModal";
import PositionModal from "./Profile/PositionModal";


class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RequestNav/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
