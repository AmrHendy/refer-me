import React from "react";

import './RequestCard.css'

class ReceivedRequestCard extends React.Component {
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

    confirmRequest(e){
        e.preventDefault();
        const {id} = this.props.request.id
        this.props.changeRequestStatus(id, 'confirmed');
    }

    rejectRequest(e){
        e.preventDefault();
        const {id} = this.props.request.id
        this.props.changeRequestStatus(id, 'rejected');
    }

    render() {
        const {profileImage, firstName, lastName} = this.props.request.user_info.sender;
        const {position, company, city, country, message} = this.props.request.position_info;
        
        return (        
            <div className="w3-row w3-card-2 w3-round-xlarge requestCard-comp1">
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

                <div className="w3-col w3-small requestCard-comp9">
                    <div>
                        <button className="w3-btn w3-teal w3-round-large requestCard-comp10" onClick={this.viewResume}>
                            view resume
                        </button>
                    </div>
                    <div>
                        <button className="w3-btn w3-green w3-round-large requestCard-comp10" onClick={this.confirmRequest}>
                            confirm application
                        </button>
                    </div>
                    <div>
                        <button className="w3-btn w3-red w3-round-large requestCard-comp11" onClick={this.rejectRequest}>
                            reject application
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReceivedRequestCard;
