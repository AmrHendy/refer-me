import React from "react";


import updateProfileRequest from "../../actions/creators/profileActions";
import updateProfile from "../../services/updateProfileService";

import './ProfileCard.css'

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    
    //console.log(props)
    
    this.state = {...this.props.items};
    
    this.handleChange = this.handleChange.bind(this);

    this.viewResume = this.viewResume.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
  
}
  // to keep the login form updated always
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleUpdate(e){
      e.preventDefault();

      const {firstName, lastName, email, password} = this.state;

      if (email && password && firstName && lastName) {
        // dispatch the login action (email, password)
        console.log(email, password);
        //this.props.dispatch(loginRequest(email, password));
        let response = updateProfile(email, password, firstName, lastName);
        console.log("response = ", response);
        this.props.dispatch(updateProfileRequest(response));
      }
  
  }

  viewResume(e){
      e.preventDefault();
      window.open(this.state.resumeLink);
  }

  render() {
      const {imagePath, firstName, lastName, email, password } = this.state;
    return (
        <div className="w3-col w3-card-2 w3-round profileCard-comp1">

				<div className="w3-row profileCard-comp2">
					<img className="w3-col w3-card-2 profileCard-comp3" src={imagePath}/>
					<div className="w3-col w3-center w3-xlarge profileCard-comp4">{firstName} {lastName}</div>
				</div>

				<div className="w3- profileCard-comp5">

					<div className="w3-row profileCard-comp6">
						<div className="w3-col profileCard-comp7">
							First Name
						</div>

						<div className="w3-col profileCard-comp8">
							<input type="text" className="w3-input w3-border" onChange={this.handleChange} name="firstName" value= {firstName} />
						</div>
					</div>

					<div className="w3-row profileCard-comp6" >
						<div className="w3-col profileCard-comp7" >
							Last Name
						</div>

						<div className="w3-col profileCard-comp8" >
							<input type="text" className="w3-input w3-border" onChange={this.handleChange} name="lastName" value={lastName}/>
						</div>
					</div>

					<div className="w3-row profileCard-comp6" >
						<div className="w3-col profileCard-comp7" >
							Email
						</div>

						<div className="w3-col profileCard-comp8" >
							<input type="text" className="w3-input w3-border" onChange={this.handleChange} name="email" value={email}/>
						</div>
					</div>

					<div className="w3-row profileCard-comp6" >
						<div className="w3-col profileCard-comp7" >
							Password
						</div>

						<div className="w3-col profileCard-comp8" >
							<input type="text" className="w3-input w3-border" onChange={this.handleChange} name="password" value={password}/>
						</div>
					</div>

					<div className="w3-row profileCard-comp6" >
						<div className="w3-col profileCard-comp7" >
							Resume
						</div>

						<div className="w3-col profileCard-comp9">
							<button className="w3-btn w3-teal" onClick={this.viewResume}>view</button>
							<button className="w3-btn w3-red profileCard-comp10">change</button>
						</div>
					</div>


					<div className="w3-row profileCard-comp6 update-btn" >
						<div className="w3-col profileCard-comp9">
							<button className="w3-btn w3-indigo" onClick = {this.handleUpdate}>Update Info</button>
						</div>
					</div>

				</div>
				
			</div>
    );
  }
}

export default ProfileCard;