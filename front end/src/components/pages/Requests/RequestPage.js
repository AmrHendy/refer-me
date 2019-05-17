import React from "react";

import TopNav from "../../layout/topnav";
import RequestNav from "./RequestNav";
import SentRequestCard from "./SentRequestCard";
import RecievedRequestCard from "./RecievedRequestCard";
import RespondedRequestCard from "./RespondedRequestCard";

import getRequests from "../../../services/getRequests";
import updateRequest from "../../../services/updateRequest";
import getProfileData from '../../../services/getProfileDataService'
import checkLogin from '../../../services/checkLoginService';
import getRequestNum from "../../../services/getRequestNum";

import './RequestNav.css'



class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems : {
        imagePath: 'http://localhost:8000/profile.png',
        firstName: '',
        lastName: '',
        requestNum: ''
      },
      requestsType: "sent",
      requests: { sentRequests: [], receivedRequests: [], respondedRequests: [] },
      email: localStorage.getItem("email")
    };
    
    this.viewRequests = this.viewRequests.bind(this);
    this.changeRequestStatus = this.changeRequestStatus.bind(this);
    checkLogin(false);
  }

  componentWillMount() {
    if(checkLogin(false)) return;
    let response = getRequests(localStorage.getItem("email"));
    console.log("All requests getting from database = ", response);
    let sentRequests = response.requests.filter(request => {
      return request.user_info.sender.email === this.state.email;
    });

    let receivedRequests = response.requests.filter(request => {
      return request.user_info.recipient.email === this.state.email && request.status === "pending";
    });

    let respondedRequests = response.requests.filter(request => {
      return request.user_info.recipient.email === this.state.email && request.status !== "pending";
    });

    console.log('Filtered sent requests = ', sentRequests);
    console.log('Filtered recieved requests = ', receivedRequests);
    console.log('Filtered responded requests = ', respondedRequests);

    response = getProfileData();
    this.setState({
      navItems:{ 
        // imagePath, first_name, last_name ---> global state retrival 
        imagePath: response.user_info.img_link,
        firstName: response.user_info.first_name,
        lastName: response.user_info.last_name,
        requestNum: getRequestNum().request_count
      },
      requests: {
        sentRequests: sentRequests,
        receivedRequests: receivedRequests,
        respondedRequests: respondedRequests
      }
    })
  }

  viewRequests(reqType) {
    // type should be 'sent' or 'received'
    this.setState({ requestsType: reqType });
    console.log('Changing requests type to ', reqType);
  }

  changeRequestStatus(requestId, newStatus){
    // send ajax update request to backend
    console.log('Updated request with id: ', requestId, ' to status ', newStatus);
    let response = updateRequest(requestId, newStatus);
    alert("Successfully updated request");
  }

  render() {
    let navItems = { ...this.state.navItems };
    return (
      <React.Fragment>      
        <TopNav items= {navItems}/>
        <RequestNav viewRequests={this.viewRequests} />
        <div className="sh-requests-sidenav-content-container">
          {this.state.requestsType === "sent"
            ? this.state.requests.sentRequests.map(request => {
                console.log("sent request", request);
                return <SentRequestCard key={request.id} request={request} />
              })
            : this.state.requestsType === "received" ? 
                this.state.requests.receivedRequests.map(request => {
                  console.log("recieved request", request);
                  return <RecievedRequestCard key={request.id} request={request} 
                            changeRequestStatus={this.changeRequestStatus}/>
                })
              :
                this.state.requests.respondedRequests.map(request => {
                  console.log("recieved request", request);
                  return <RespondedRequestCard key={request.id} request={request} 
                            changeRequestStatus={this.changeRequestStatus}/>
                })
          }
        </div>
      </React.Fragment>
    );
  }
}

export default RequestPage;

