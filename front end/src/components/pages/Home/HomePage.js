import React from "react";
import { connect } from "react-redux";

import Sidenav from "./sidenav";
import OfficeCard from "./OfficeCard";
import TopNav from "../../layout/topnav";
import RequestModal from "./RequestModal";
import "./HomePage.css";

import getRequestNum from "../../../services/getRequestNum";
import getProfileData from "../../../services/getProfileDataService";
import checkLogin from "../../../services/checkLoginService";
import filterJobs from "../../../services/filterJobsService";
import searchRequest from "../../../actions/creators/searchActions";
import sendReferRequest from "../../../services/sendReferRequestService";

import store from "../../../helpers/store";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: {
        imagePath: "http://localhost:8000/profile.png",
        firstName: "",
        lastName: "",
        requestNum:""
      },
      filteredJobs: [],

      requestReferInfo: {
        sendingUserEmail: "",
        recipientUserEmail: "",
        company: "",
        country: "",
        city: "",
        position: "",
        message: "",
        status: ""
      },
      displayModal: false
    };
    // check logged in user
    checkLogin(false);

    this.getData = this.getData.bind(this);
    this.displayRequestModal = this.displayRequestModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.submitReuqestRefer = this.submitReuqestRefer.bind(this);
    this.sendReferReuqestInfo = this.sendReferReuqestInfo.bind(this);
  }

  componentDidMount() {
    // at the start of the component we fetch data and set local state
  }

  componentWillMount() {
    if (!checkLogin(false)) {
      // init default filtered jobs
      store.subscribe(() => this.getData());

      let response = filterJobs("init", "");
      this.props.dispatch(searchRequest(response));
    }
  }

  getData() {
    let response = getProfileData();
    /*
      response = {
                  user_info: {first_name, last_name, email, password, img_link, resume_link },
                  positions_held: [ {company , office, position, date, imagePath }, ...] }
    */
    this.setState({
      navItems: {
        // imagePath, first_name, last_name ---> global state retrival
        imagePath: response.user_info.img_link,
        firstName: response.user_info.first_name,
        lastName: response.user_info.last_name,
        requestNum: getRequestNum().request_count
      },
      filteredJobs: store.getState().filteredJobs,
      requestReferInfo: {
        ...this.state.requestReferInfo,
        sendingUserEmail: response.user_info.email
      }
    });
  }

  displayRequestModal(requestReferInfo) {
    // user id, company, position, city, country,  message
    this.setState({ displayModal: true });
    this.sendReferReuqestInfo(requestReferInfo);
  }

  cancelModal() {
    this.setState({ displayModal: false });
    this.setState({ requestReferInfo: null });
  }

  submitModal(info) {
    this.setState({ displayModal: false });
    let referRequest = {...this.state.requestReferInfo, ...info, status: "pending"};
    this.submitReuqestRefer(referRequest);
  }

  sendReferReuqestInfo(info) {
    // merge two object attributes
    this.setState({ requestReferInfo: {...this.state.requestReferInfo, ...info}});
  }

  submitReuqestRefer(referRequest) {
    console.log("Sending refer request info to backend = ", referRequest);
    let response = sendReferRequest(referRequest);
    if (response.status === "success") {
      alert("Success Adding request refer");
    } else {
      alert("Error Adding request refer ,, try again");
    }
  }

  render() {
    let navItems = { ...this.state.navItems };
    return (
      <React.Fragment>
        <TopNav items={navItems} />
        <Sidenav />
        <div className="sh-home-content-container">
          {this.state.filteredJobs.filteredJobs.map((job, index) => {
            return (
              <OfficeCard
                index={index}
                key={job.key}
                company={job.company}
                office={job.office}
                employees={job.employees}
                displayRequestModal={this.displayRequestModal}
              />
            );
          })}
        </div>
        {this.state.displayModal ? (
          <RequestModal cancel={this.cancelModal} submit={this.submitModal} />
        ) : null}
      </React.Fragment>
    );
  }
}

let connectedHomePage = connect(
  null,
  null
)(HomePage);

export default connectedHomePage;
