import React from "react";

import TopNav from "../../layout/topnav";
import RequestNav from "./RequestNav";
import SentRequestCard from "./SentRequestCard";
import RecievedRequestCard from "./RecievedRequestCard";

import getRequests from "../../../services/getRequests";
import updateRequest from "../../../services/updateRequest";
import getProfileData from '../../../services/getProfileDataService'
import checkLogin from '../../../services/checkLoginService';
import getRequestNum from "../../../services/getRequestNum";



class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems : {
        imagePath: 'http://localhost:8000/profile.png',
        firstName: '',
        lastName: '',
        requestNum: 0
      },
      requestsType: "sent",
      requests: { sentRequests: [], receivedRequests: [] },
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
      return request.user_info.recipient.email === this.state.email;
    });
    console.log('Filtered recieved requests = ', receivedRequests);
    console.log('Filtered sent requests = ', sentRequests);
    
    
    response = getProfileData();
    //    let requestNum = getRequestNum();
    let requestNum = 5;
    this.setState({
      navItems:{ 
        // imagePath, first_name, last_name ---> global state retrival 
        imagePath: response.user_info.img_link,
        firstName: response.user_info.first_name,
        lastName: response.user_info.last_name,
        requestNum: requestNum
      },
      requests: {
        sentRequests: sentRequests,
        receivedRequests: receivedRequests
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
    if(response.status === "success"){
      alert("Successfully updated request");
    }
    else{
      alert("Error while updating request");
    }
  }

  render() {
    let navItems = { ...this.state.navItems };

    return (
      <React.Fragment>
        {/*<TopNav items={navItems} />*/}
        <RequestNav viewRequests={this.viewRequests} />
        <br />
        {this.state.requestsType === "sent"
          ? this.state.requests.sentRequests.map(request => {
              console.log("request", request);
              return <SentRequestCard key={request.id} request={request} />;
            })
          : this.state.requests.receivedRequests.map(request => {
              console.log("request", request);
              return <RecievedRequestCard key={request.id} request={request} 
                        changeRequestStatus={this.changeRequestStatus}/>;
            })};
      </React.Fragment>
    );
  }
}

export default RequestPage;

