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
import SentRequestsPage from './Requests/SentRequestsPage';


class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let requests = [{sender: {profileImage:'http://localhost:8000/profile.png', firstName:'Mohamed', lastName:'Shaban', resumeLink:''},
             info:{position:'SA', company: 'Google', city:'Alex', country:'EG'}}];
    return (
      //const {profileImage, firstName, lastName, resumeLink} = this.props.request.sender;
      //const {position, company, city, country} = this.props.request.info;
      <SentRequestsPage requests={requests}/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
