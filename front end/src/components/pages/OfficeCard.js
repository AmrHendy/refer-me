import React from "react";

import './sidenav.css'; 
import './OfficeCard.css'
import ProfileCard from "../layout/EmployeeCard";
import EmployeeCard from "../layout/EmployeeCard";


class OfficeCard extends React.Component {
    constructor(props){
        super(props)
        // will be sent via props
        this.state = {
            company: props.company || 'Google',
            office: props.office || {city: 'Alexandria', Country: 'Egypt'},
            // {firstName, lastName, position}
            employees: props.employees || [
                {firstName: 'Essam', lastName: 'Khamis', position: 'CEO'},
                {firstName: 'Mohamed', lastName: 'Shaban', position: 'CEO'}
                ],
            viewSize: 1
        };
        
        this.handleViewMore = this.handleViewMore.bind(this);
        this.sendReuqestInfo = this.sendReuqestInfo.bind(this);
    }

    componentDidMount(){
        // at the start of the component we fetch data and set local state
    }

    handleViewMore(e){
        e.preventDefault();
        this.setState({viewSize : this.state.viewSize + 2});
    }
    
    sendReuqestInfo(employeeReuqestReferInfo){
        // user id, company, position, city, country,  message
        // add employeeReuqestReferInfo to request and also add company, office, ....
        let requestReferInfo = {...employeeReuqestReferInfo, 
                                company: this.state.company,
                                city: this.state.city,
                                country: this.state.country};
        this.props.displayRequestModal(requestReferInfo);
    }

    render() {
        return (
            <div className="w3-col w3-container w3-card-2 w3-round company-card">

            <div className="w3-xlarge w3-padding-16 company-name">{this.state.company}, {this.state.office.city}, {this.state.office.Country}</div>
                {this.state.employees.slice(0, this.state.viewSize + 1).map((employee) => {
                    return <EmployeeCard employee={employee} sendReuqestInfo={this.sendReuqestInfo}/>;
                })}
                <div className="w3-padding-16 w3-center">
                    <a href="#" className="expand-link" onClick={this.handleViewMore}>view more</a>	
                </div>
            </div>
        );
    }
}

export default OfficeCard;
