import React from "react";

import './RequestCard.css'

class SentRequestCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const {profileImage, firstName, lastName} = this.props.request.user_info.recipient;
        //const {position, company, city, country, message} = this.props.request.position_info;

        const profileImage = "http://localhost:8000/profile.png";
        const firstName = "mohamed"; const lastName = "shaban";

        const position = "Junior swe";
        const company = "Google";
        const city = "Berlin";
        const country = "Germany";
        const message = "hello world";

        // setting the request color according to the status
        let requestStatus = this.props.request.status;
        let requestClass = null;
        switch(requestStatus){
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
                    <img className="w3-card-2 requestCard-comp3" src={profileImage}/>
                    <div className="w3-large requestCard-comp4">{firstName} {lastName}</div>
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
                        <div className="w3-col requestCard-comp8">{city}, {country}</div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-col requestCard-comp6">Message</div>
                        <div className="w3-col requestCard-comp7"> : </div>
                        <div className="w3-col requestCard-comp8">{message}</div>
                    </div>
                </div>
                <div className="w3-col sh-request-status-container">
                    <span className={`sh-request-status ${requestClass}`}>
                        {requestStatus}
                    </span>
                </div>
            </div>
        );
    }
}

export default SentRequestCard;
