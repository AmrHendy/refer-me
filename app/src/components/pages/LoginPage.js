import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import loginRequest from "../../actions/creators/loginActions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
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
    const { username, password } = this.state;

    if (username && password) {
      // dispatch the login action (username, password)
      this.props.dispatch(loginRequest(username, password));
    }
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className="col-md-3 col-md-offset-4">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <div className="input-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-user" />
              </span>
              <input
                id="username"
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
              {submitted && !username && (
                <div className="help-block">Username is required</div>
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
