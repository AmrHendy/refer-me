import React from "react";

import "./sidenav.css";
import "./OfficeCard.css";
import EmployeeCard from "./EmployeeCard";

class OfficeCard extends React.Component {
  constructor(props) {
    super(props);
    // will be sent via props
    this.state = {
      company: "",
      office: { city: "", country: "" },
      employees: [],
      viewSize: 1
    };

    console.log("inside office card", this.props);
    this.handleViewMore = this.handleViewMore.bind(this);
    this.sendReuqestInfo = this.sendReuqestInfo.bind(this);
  }

  componentDidMount() {
    // at the start of the component we fetch data and set local state
  }

  handleViewMore(e) {
    e.preventDefault();
    this.setState({ viewSize: this.state.viewSize + 2 });
  }

  sendReuqestInfo(employeeReuqestReferInfo) {
    // sending user email, recipient user email, company, position, city, country, message
    // add employeeReuqestReferInfo to request and also add company, office, ....
    let requestReferInfo = {
      ...employeeReuqestReferInfo,
      company: this.props.company,
      city: this.props.city,
      country: this.props.country
    };
    this.props.displayRequestModal(requestReferInfo);
  }

  render() {
    // to put margin top with the first card only
    let cardClass = this.props.index == 0 ? 'first-company-card' : '';
    return (
      <div className={`w3-col w3-container w3-border w3-light-grey w3-round-large company-card ${cardClass}`}>
        <div className="w3-xlarge w3-padding-16 company-name">
          {this.props.company}, {this.props.office.city},{" "}
          {this.props.office.country}
        </div>
        {this.props.employees.length == 0
          ? null
          : this.props.employees
              .slice(
                0,
                Math.min(this.state.viewSize + 1, this.props.employees.length)
              )
              .map(employee => {
                return (
                  <EmployeeCard
                    key={employee._id}
                    employee={employee}
                    sendReuqestInfo={this.sendReuqestInfo}
                  />
                );
              })}
        <div className="w3-padding-16 w3-center">
          <a href="#" className="expand-link" onClick={this.handleViewMore}>
            view more
          </a>
        </div>
      </div>
    );
  }
}

export default OfficeCard;
