import React from "react";
import { connect } from "react-redux";

class ProfileNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              </button>
              <a class="navbar-brand">Refer ME</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Profile</a></li>
              </ul>
              
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Signout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default ProfileNavbar;
