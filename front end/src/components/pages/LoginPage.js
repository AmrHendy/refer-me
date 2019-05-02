import React from "react";
import { connect } from "react-redux";

import loginRequest from "../../actions/creators/loginActions";
import login from "../../services/loginService";

import './LoginPage.css'; 

import store from '../../helpers/store';
      
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false,
      resgisterPressed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goRegister = this.goRegister.bind(this);
  }

  // to keep the login form updated always
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // submit the login form which will call a reducer
  handleSubmit(e) {
    // prevent form from submitting by default until we check the state status after dispatching
    e.preventDefault();

    if(this.state.resgisterPressed === true){
      return;
    }
    //alert('handle submit')

    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (email && password) {
      // dispatch the login action (email, password)
      console.log(email, password);
      //this.props.dispatch(loginRequest(email, password));
      let response = login(email, password);
      console.log("response = ", response);
      this.props.dispatch(loginRequest(response));
      
      if(response.status === 'success')
      {
        window.location.href = '/home';
      }
    }
  }

  goRegister(){
    this.setState({resgisterPressed: true})
    //alert('redirect to register')    
    window.location.href = '/register';
  }

  render() {
    const { email, password, submitted } = this.state;
    return(
      <React.Fragment>
        <div id="signin_modal" className="w3-modal">
          <div className="w3-modal-content w3-animate-zoom w3-card-12 comp1">
            <header className="w3-container w3-blue-grey w3-padding-8 comp2">
              <h2 className="w3-large">
                <i className="fa fa-user w3-xlarge comp3"></i>
                Login
              </h2>
            </header>

            {/*error msg*/}
            <div id="error_msg" className="w3-container w3-red w3-center comp4">
              wrong name or password
            </div>
    
            {/*input fields*/} 
            <form name="form" className="w3-container comp5" onSubmit={this.handleSubmit}>
              <div className="comp6">
                <label className="w3-text-grey"><b>Email</b></label>
                <input type="email" className="w3-input w3-border" placeholder="userID@provider.domain" 
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className="comp7">
                <label className="w3-text-grey"><b>Password</b></label>
                <input type="password" className="w3-input w3-border" placeholder="1234567890"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
    
              {/*form actions*/} 
              <div className="w3-center comp8">
                <button id="signin_btn" className="w3-btn w3-green w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp9">
							    Sign In
					  	  </button>
					    	<button id="signup_btn" className="w3-btn w3-dark-grey w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp10"
                  onClick={this.goRegister}>
							    Sign Up
						    </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}




let connectedLoginPage = connect(
  null,
  null
)(LoginPage);

export default connectedLoginPage;
