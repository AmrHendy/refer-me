import React from "react";

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import ProfileNavbar from "../layout/ProfileNavbar";
import { connect } from "react-redux";
import Sidenav from "./sidenav";
import OfficeCard from "./OfficeCard";
import HomePage from "./HomePage";
import TopNav from "./topnav";
import EmployeeCard from "../layout/EmployeeCard";
import ProfileCard from "../layout/ProfileCard";
import PostionCard from "../layout/PositionCard";
import ProfilePage from "./ProfilePage";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = {
      imagePath: 'http://localhost:8000/profile.png',
      firstName: 'ahmed',
      lastName: 'ezzat',
      password: 'password',
      email: 'ezzat@gmail.com',
      resumeLink: 'http://localhost:8000/resume.pdf'
    };


    const items2 = {
      imagePath: 'http://localhost:8000/profile.png',
      company: 'ahmed',
      office: 'ezzat',
      position: 'password',
      date: '2010-2011'
    };

    return (
      <ProfilePage/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
