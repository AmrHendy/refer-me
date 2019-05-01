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
import RequestNav from "../layout/RequestNav";
import RequestCard from "../layout/RequestCard";
import RequestModal from "./RequestModal"

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

    // done
    const employeeCardProps = {
      userName: 'Essam Khamis',
      postion: 'Software Engineer'
    };


    return (
      <HomePage/>
    );
  }
}

const connectedTest = connect(
  null,
  null
)(Test);

export default connectedTest;
