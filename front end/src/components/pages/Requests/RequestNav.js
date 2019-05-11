import React from "react";

import './RequestNav.css'

class RequestNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="w3-col w3-card-2 w3-round-large w3-large w3-border requestNav-comp1">
        <div className="w3-hover-grey requestNav-comp2" onClick={this.props.showSentRequests}>
            Sent Requests
        </div>
        <div className="w3-hover-grey w3-teal requestNav-comp2" onClick={this.props.ReceivedSentRequests}>
            Received Requests
        </div>
    </div>
    );
  }
}

export default RequestNav;
