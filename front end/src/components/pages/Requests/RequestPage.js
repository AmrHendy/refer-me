import React from "react";
import RequestNav from "./RequestNav";
import SentRequestCard from "./SentRequestCard";
import RecievedRequestCard from "./RecievedRequestCard";

import getRequests from "../../../services/getRequests";
import updateRequest from "../../../services/updateRequest";


class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsType: "sent",
      requests: { sentRequests: [], receivedRequests: [] },
      email: localStorage.getItem("email")
    };
    
    this.viewRequests = this.viewRequests.bind(this);
    this.changeRequestStatus = this.changeRequestStatus.bind(this);
  }

  componentWillMount() {
    let response = getRequests();
    console.log("All requests getting from database = ", response);
    let sentRequests = response.requests.filter(request => {
      return request.user_id.sender === this.state.email;
    });

    let receivedRequests = response.requests.filter(request => {
      return request.user_id.recipient === this.state.email;
    });
    console.log('Filtered recieved requests = ', receivedRequests);
    console.log('Filtered sent requests = ', sentRequests);
    
    this.setState({
      requests: {
        sentRequests: sentRequests,
        receivedRequests: receivedRequests
      }
    });
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
    return (
      <React.Fragment>
        <RequestNav viewRequests={this.viewRequests} />
        <br />
        {this.state.requestsType === "sent"
          ? this.state.requests.sentRequests.map(request => {
              console.log("request", request);
              return <SentRequestCard key={request._id} request={request} />;
            })
          : this.state.requests.receivedRequests.map(request => {
              console.log("request", request);
              return <RecievedRequestCard key={request._id} request={request} 
                        changeRequestStatus={this.changeRequestStatus}/>;
            })};
      </React.Fragment>
    );
  }
}

export default RequestPage;

