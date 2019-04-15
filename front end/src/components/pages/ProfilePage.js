import React from "react";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div class="card">
          cd
          <h1>{this.state.loggedInUser}</h1>
          <p class="title">Email: {this.state.loggedInUser.email}</p>
          <p class="title">Software Engineer at Google</p>
          <a href="#">
            <i class="fa fa-dribbble" />
          </a>
          <a href="#">
            <i class="fa fa-twitter" />
          </a>
          <a href="#">
            <i class="fa fa-linkedin" />
          </a>
          <a href="#">
            <i class="fa fa-facebook" />
          </a>
          <p>
            <button>Contact</button>
          </p>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
