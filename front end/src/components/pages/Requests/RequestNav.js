import React from "react";

import "./RequestNav.css";

class RequestNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentClass: "w3-teal",
      receivedClass: "",
      respondedClass: ""
    };
    this.viewSent = this.viewSent.bind(this);
    this.viewReceived = this.viewReceived.bind(this);
    this.viewResponded = this.viewResponded.bind(this);
  }

  viewSent() {
    this.setState({
      sentClass: "w3-teal",
      receivedClass: "",
      respondedClass: ""
    });
    this.props.viewRequests("sent");
  }

  viewReceived() {
    this.setState({
      sentClass: "",
      receivedClass: "w3-teal",
      respondedClass: ""
    });
    this.props.viewRequests("received");
  }

  viewResponded() {
    this.setState({
      sentClass: "",
      receivedClass: "",
      respondedClass: "w3-teal"
    });
    this.props.viewRequests("responded");
  }

  render() {
    return (
      <div className="w3-round-large w3-large w3-border requestNav-comp1">
        <div className="sh-requests-sidenav-category-label">
          Sent Requests
        </div>
        <div className={`w3-hover-grey w3-medium requestNav-comp2 ${this.state.sentClass}`} onClick={this.viewSent}>
          All Requests
        </div>
        <div className="sh-requests-sidenav-category-label">
          Received Requests
        </div>
        <div
          className={`w3-hover-grey w3-medium requestNav-comp2 ${this.state.receivedClass}`}
          onClick={this.viewReceived}>
          Pending Response
        </div>
        <div
          className={`w3-hover-grey w3-medium requestNav-comp2 ${this.state.respondedClass}`}
          onClick={this.viewResponded}>
          Done
        </div>
      </div>
    );
  }
}

export default RequestNav;
