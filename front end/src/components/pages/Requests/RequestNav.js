import React from "react";

import './RequestNav.css'

class RequestNav extends React.Component {
  constructor(props) {
    super(props);
    this.viewSent = this.viewSent.bind(this);
    this.viewReceived = this.viewReceived.bind(this);
  }

  viewSent(){
    this.props.viewRequests('sent');
  }

  viewReceived(){
    this.props.viewRequests('received');
  }

  render() {
    return (
    <div className="w3-round-large w3-large w3-border requestNav-comp1">
        <div className="w3-teal requestNav-comp2" onClick={this.viewSent}>
            Sent Requests
        </div>
        <div className="w3-hover-grey requestNav-comp2" onClick={this.viewReceived}>
            Received Requests
        </div>
    </div>
    );
  }
}

export default RequestNav;
