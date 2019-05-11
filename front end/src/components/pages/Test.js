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
import RequestModal from "./Home/RequestModal";
import PositionModal from "./Profile/PositionModal";
import SentRequestCard from './Requests/SentRequestCard';
import RecievedRequestCard from './Requests/RecievedRequestCard';


class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoginPage/>
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
