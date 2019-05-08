import React from "react";
import { connect } from "react-redux";

import registerRequest from "../../../actions/creators/registerActions";
import register from "../../../services/registerService";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        loginPressed: false
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goLogin = this.goLogin.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if(this.state.loginPressed === true){
      return;
    }
    this.setState({ submitted: true });
    const { user } = this.state;

    if (user.firstName && user.lastName && user.email && user.password) {
      // dispatch the register action (user)
      let response = register(user);
      this.props.dispatch(registerRequest(response));
      if(response.status === 'success')
      {
        window.location.href = '/home';
      }
    }
  }

  goLogin(){
    this.setState({loginPressed: true})
    //alert('redirect to sign in')
    window.location.href = '/login';
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <React.Fragment>
        <div id="signin_modal" className="w3-modal comp11">
          <div className="w3-modal-content w3-animate-zoom w3-card-12 comp1">
            <header className="w3-container w3-blue-grey w3-padding-8 comp2">
              <h2 className="w3-large">
                <i className="fa fa-user w3-xlarge comp3"></i>
                Sign up
              </h2>
            </header>

            {/*error msg*/}
            <div id="error_msg" className="w3-container w3-red w3-center comp4">
              wrong name or password
            </div>
    
            {/*input fields*/} 
            <form name="form" className="w3-container comp5" onSubmit={this.handleSubmit}>
              <div className="comp6">
                <label className="w3-text-grey"><b>First Name</b></label>
                <input type="text" className="w3-input w3-border" 
                  name="firstName"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="comp12">
                <label className="w3-text-grey"><b>Last Name</b></label>
                <input type="text" className="w3-input w3-border" 
                  name="lastName"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="comp12">
                <label className="w3-text-grey"><b>Email</b></label>
                <input type="email" className="w3-input w3-border" 
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className="comp12">
                <label className="w3-text-grey"><b>Password</b></label>
                <input type="password" className="w3-input w3-border"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.handleChange}
                />
              </div>
    
              {/*form actions*/} 
              <div className="w3-center comp8">
                <button id="signin_btn" className="w3-btn w3-green w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp9"
                  onClick={this.goLogin}>
							    Sign In
					  	  </button>
					    	<button id="signup_btn" className="w3-btn w3-dark-grey w3-margin-bottom w3-round-xxlarge w3-ripple w3-padding-8 comp10">
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

const connectedRegisterPage = connect(
  null,
  null
)(RegisterPage);

export default connectedRegisterPage;
