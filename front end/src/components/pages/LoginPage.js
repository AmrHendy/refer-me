import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import loginRequest from "../../actions/creators/loginActions";
import login from "../../services/loginService";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (email && password) {
      // dispatch the login action (email, password)
      console.log(email, password);
      //this.props.dispatch(loginRequest(email, password));
      let response = login(email, password);
      console.log("response = ", response);
      this.props.dispatch(loginRequest(response));
    }
  }

  render() {
    const { email, password, submitted } = this.state;

    return (
      <div className="col-md-3 col-md-offset-4">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={"form-group" + (submitted && !email ? " has-error" : "")}
          >
            <div className="input-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-user" />
              </span>
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                placeholder="User Email"
                value={email}
                onChange={this.handleChange}
              />
              {submitted && !email && (
                <div className="help-block">Email is required</div>
              )}
            </div>
          </div>

          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <div className="input-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-lock" />
              </span>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

let connectedLoginPage = connect(
  null,
  null
)(LoginPage);

export default connectedLoginPage;
