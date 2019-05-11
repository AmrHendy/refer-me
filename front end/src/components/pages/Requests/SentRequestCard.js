import React from "react";

import './RequestCard.css'

class SentRequestCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {profileImage, firstName, lastName} = this.props.request.user_info.sender;
        const {position, company, city, country} = this.props.request.info;
        // setting the request color according to the status
        let {requestStatus} = this.props.request.status;
        let requestClass = null;
        switch(requestStatus){
            case "pending_response":
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
            <div class="w3-row w3-card-2 w3-round-xlarge requestCard-comp1">
                <div class="w3-col w3-center requestCard-comp2">
                    <img class="w3-card-2 requestCard-comp3" src={profileImage}/>
                    <div class="w3-large requestCard-comp4">{firstName} {lastName}</div>
                </div>

                <div class="w3-col w3-large requestCard-comp5">
                    <div class="w3-row">
                        <div class="w3-col requestCard-comp6">Position</div>
                        <div class="w3-col requestCard-comp7"> : </div>
                        <div class="w3-col requestCard-comp8">{position}</div>
                    </div>
                    <div class="w3-row">
                        <div class="w3-col requestCard-comp6">Company</div>
                        <div class="w3-col requestCard-comp7"> : </div>
                        <div class="w3-col requestCard-comp8">{company}</div>
                    </div>
                    <div class="w3-row">
                        <div class="w3-col requestCard-comp6">Office</div>
                        <div class="w3-col requestCard-comp7"> : </div>
                        <div class="w3-col requestCard-comp8">{city}, {country}</div>
                    </div>
                </div>
                <div class={`w3-col w3-small requestCard-comp9 ${requestClass}`}>
                    <div>
                        <div class="w3-btn w3-red w3-round-large requestCard-comp11">
                            {requestStatus}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SentRequestCard;
