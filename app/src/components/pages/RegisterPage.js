import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.setState({ submitted: true });
    const { user } = this.state;
    //const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password) {
      // dispatch the register action (user)
    }
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-3 col-md-offset-4">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {/* first name*/}
          <div
            className={
              "form-group" + (submitted && !user.firstName ? " has-error" : "")
            }
          >
            <div className="input-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-user" />
              </span>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={this.handleChange}
              />
              {submitted && !user.firstName && (
                <div className="help-block">First Name is required</div>
              )}
            </div>
          </div>

          {/* last name*/}
          <div
            className={
              "form-group" + (submitted && !user.lastName ? " has-error" : "")
            }
          >
            <div className="input-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-user" />
              </span>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={this.handleChange}
              />
              {submitted && !user.lastName && (
                <div className="help-block">Last Name is required</div>
              )}
            </div>
          </div>

          {/* user name*/}
          <div
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
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
                value={user.username}
                onChange={this.handleChange}
              />
              {submitted && !user.username && (
                <div className="help-block">Username is required</div>
              )}
            </div>
          </div>

          {/* password*/}
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
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
                value={user.password}
                onChange={this.handleChange}
              />
              {submitted && !user.password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedRegisterPage = connect(
  mapStateToProps,
  null
)(RegisterPage);

export default RegisterPage;
