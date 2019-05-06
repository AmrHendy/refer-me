import React from "react";
import './PositionModal.css';

import addPosition from '../../../services/addPositionService'

class PositionModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {position: '', company: '', country: '', city: '', start_date: '', end_date: ''};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submit(){
        let positionInfo = {...this.state, 'email': localStorage.getItem('email')};
        addPosition(positionInfo);
        window.location.href = '/profile';
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    cancel(){
        window.location.href = '/profile';
    }

    render(){
        return (
            <div id="signin_modal" className="w3-modal position-modal-comp1234">
                <div className="w3-modal-content w3-animate-zoom w3-card-12 position-modal-comp1">
                    <div className="w3-container w3-teal w3-padding-16 position-modal-comp2">
                        Add New Position
                    </div>
        
                    <div className="w3-container position-modal-comp11">
    
                        <div className="position-modal-comp6">
                            <label className="w3-text-grey"><b>Position</b></label>
                            <input type="text" className="w3-input w3-border position-modal-comp13"
                                placeholder="e.g. software engineer" name="position" onChange={this.handleChange}/>
                        </div>
                        <div className="position-modal-comp6">
                            <label className="w3-text-grey"><b>Company</b></label>
                            <input type="text" className="w3-input w3-border position-modal-comp13"
                                placeholder="e.g. Google" name="company" onChange={this.handleChange}/>
                        </div>
                        <div className="position-modal-comp6">
                            <label className="w3-text-grey"><b>Country</b></label>
                            <input type="text" className="w3-input w3-border position-modal-comp13"
                                placeholder="e.g. Germany" name="country" onChange={this.handleChange}/>
                        </div>
                        <div className="position-modal-comp6">
                            <label className="w3-text-grey"><b>Office City</b></label>
                            <input type="text" className="w3-input w3-border position-modal-comp13"
                                placeholder="e.g. Berlin" name="city" onChange={this.handleChange}/>
                        </div>
                        <div className="position-modal-comp6">
                            <div className="w3-row date-input-container">
                                <div className="w3-col date-label-comp w3-text-grey">Start Date</div>
                                <input type="text" name="start_date" className="w3-col date-field-comp" 
                                placeholder="feb 2017" onChange={this.handleChange}/>
                            </div>
                            <div className="w3-row">
                                <div className="w3-col date-label-comp w3-text-grey">End Date</div>
                                <input type="text" name="end_date" className="w3-col date-field-comp" 
                                    placeholder="e.g. present" onChange={this.handleChange}/>
                            </div>
                        </div>
                    
                    </div>

                    <div className="w3-center position-modal-comp8">
                        <button id="signin_btn" className="w3-btn w3-green w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 position-modal-comp9"
                            onClick={this.submit}>
                        submit
                        </button>
                        <button id="signup_btn" className="w3-btn w3-dark-grey w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8"
                            onClick={this.cancel}>
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default PositionModal;