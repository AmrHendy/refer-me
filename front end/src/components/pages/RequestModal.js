import React from "react";
import './RequestModal.css'; 


class RequestModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {position: '', message: ''};
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit(){
    let requestReferInfo = {position: this.state.position, message: this.state.message};
    this.props.submit(this.state);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="request_modal" className="w3-modal">
        <div className="w3-modal-content w3-animate-zoom w3-card-12 comp_1">
          <div className="w3-container w3-teal w3-padding-16 comp_2">
              Request Refer
          </div>

          <div className="w3-container comp_11">
            <div className="comp_6">
              <label className="w3-text-grey"><b>Position</b></label>
              <input type="text" className="w3-input w3-border comp_13"
                placeholder="position name" name="position" value={this.state.position} onChange={this.handleChange}/>
            </div>
            
            <div className="comp_6">
              <label className="w3-text-grey"><b>Message</b></label>
              <textarea className="w3-input w3-border comp_12 comp_13" name="message" onChange={this.handleChange}>
                {this.state.message}
              </textarea>
            </div>
          </div>
 
          <div className="w3-center comp_8">
            <button id="signin_btn" className="w3-btn w3-green w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp_9"
              onClick={this.submit}>
              submit
            </button>
            
            <button id="signup_btn" className="w3-btn w3-dark-grey w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp_10"
              onClick={this.props.cancel}>
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestModal;
