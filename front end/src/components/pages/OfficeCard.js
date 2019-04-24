import React from "react";

import './sidenav.css'; 
import './OfficeCard.css'
import ProfileCard from "../layout/EmployeeCard";
import EmployeeCard from "../layout/EmployeeCard";


class OfficeCard extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            company_name: props.company_name || 'Deep Mind',
            user_name: props.user_name || 'Amr Hendy',
            user_position: props.user_position || 'CEO'
        }    
    }

    componentDidMount(){
        // at the start of the component we fetch data and set local state
    }
    
  render() {
    return (
        <div className="w3-col w3-container w3-card-2 w3-round company-card">

        <div className="w3-xlarge w3-padding-16 company-name">{this.state.company_name}</div>
    
            <EmployeeCard/>

            <div className="w3-padding-16 w3-center">
                <a href="#" className="expand-link">view more</a>	
            </div>
        </div>
      );
  }
}

export default OfficeCard;
