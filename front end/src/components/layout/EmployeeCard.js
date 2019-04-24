import React from "react";

import './EmployeeCard.css'

class EmployeeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w3-row w3-card-2 w3-round-xlarge user-card">

      <div className="w3-col image-wrapper">
          <img className="w3-card-2 image-style" src="http://localhost:8000/profile.png"/>
      </div>

      <div className="w3-col info-style">
          <div className="w3-xlarge">{this.props.userName}</div>
          <div>{this.props.postion}</div>
      </div>

      <div className="w3-col w3-small buttons-style">
          <div>
              <button  className="w3-btn w3-teal w3-round-large profile-button-style">
              view profile
              </button>
          </div>
          <div>
              <button onClick={this.requestRefer} className="w3-btn w3-teal w3-round-large refer-button-style">
              request refer
              </button>
          </div>
      </div>
    </div>
    );
  }
}

export default EmployeeCard;
