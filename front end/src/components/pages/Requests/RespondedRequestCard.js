import React from "react";

import "./RequestCard.css";

class RespondedRequestCard extends React.Component {
  constructor(props) {
    super(props);
    this.viewResume = this.viewResume.bind(this);
    this.confirmRequest = this.confirmRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }

  viewResume(e) {
    e.preventDefault();
    window.open(this.props.request.user_info.sender.resumeLink);
  }

  confirmRequest(e) {
    e.preventDefault();
    const id = this.props.request.id;
    this.props.changeRequestStatus(id, "accepted");
  }

  rejectRequest(e) {
    e.preventDefault();
    const id = this.props.request.id;
    this.props.changeRequestStatus(id, "rejected");
  }

  render() {
    const {
      profileImage,
      firstName,
      lastName
    } = this.props.request.user_info.sender;
    const {
      position,
      company,
      city,
      country,
      message
    } = this.props.request.position_info;

    // setting the request color according to the status
    let requestStatus = this.props.request.status;
    let requestClass = null;
    switch (requestStatus) {
      case "pending":
        requestStatus = "Pending";
        requestClass = "w3-teal";
        break;
      case "accepted":
        requestStatus = "Accepted";
        requestClass = "w3-green";
        break;
      case "rejected":
        requestClass = "w3-red";
        requestStatus = "Rejected";
        break;
      default:
    }

    return (
      <div className="w3-row w3-border w3-round-xlarge requestCard-comp1">
        <div className="w3-col w3-center requestCard-comp2">
          <img className="w3-card-2 requestCard-comp3" src={profileImage} />
          <div className="w3-large requestCard-comp4">
            {firstName} {lastName}
          </div>
        </div>

        <div className="w3-col w3-large requestCard-comp5">
          <div className="w3-row">
            <div className="w3-col requestCard-comp6">Position</div>
            <div className="w3-col requestCard-comp7"> : </div>
            <div className="w3-col requestCard-comp8">{position}</div>
          </div>
          <div className="w3-row">
            <div className="w3-col requestCard-comp6">Company</div>
            <div className="w3-col requestCard-comp7"> : </div>
            <div className="w3-col requestCard-comp8">{company}</div>
          </div>
          <div className="w3-row">
            <div className="w3-col requestCard-comp6">Office</div>
            <div className="w3-col requestCard-comp7"> : </div>
            <div className="w3-col requestCard-comp8">
              {city}, {country}
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-col requestCard-comp6">Message</div>
            <div className="w3-col requestCard-comp7"> : </div>
            <div className="w3-col requestCard-comp8">{message}</div>
          </div>
        </div>

        <div className="w3-col w3-small requestCard-comp9">
        <div className="w3-col sh-request-done-status-container">
            <span className={`sh-request-status ${requestClass}`}>
              {requestStatus}
            </span>
          </div>
          
          <div>
            <button
              className="w3-btn w3-teal w3-round-large requestCard-comp10"
              onClick={this.viewResume}>
              view resume
            </button>
          </div>

          {requestStatus === "Accepted" ? (
            <div>
              <button
                className="w3-btn w3-red w3-round-large requestCard-comp11"
                onClick={this.rejectRequest}>
                Change to rejected
              </button>
            </div>
          ) : (
            <div>
              <button
                className="w3-btn w3-green w3-round-large requestCard-comp10"
                onClick={this.confirmRequest}>
                Change to confirmed
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RespondedRequestCard;
