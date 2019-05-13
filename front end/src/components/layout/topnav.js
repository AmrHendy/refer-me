import React from "react";

import './topnav.css'

class TopNav extends React.Component {


    constructor(props){
        super(props)
    
        this.redirectHome = this.redirectHome.bind(this);
        this.redirectRequests = this.redirectRequests.bind(this);
        this.redirectSignout = this.redirectSignout.bind(this);
        this.redirectProfile= this.redirectProfile.bind(this);
    }
    
    redirectHome(){
        window.location.href = '/home'
    }

    redirectRequests(){
        window.location.href = '/requests'
    }

    redirectSignout(){
        localStorage.setItem('email', null);
        window.location.href = '/login'
    }


    redirectProfile(){
        window.location.href = '/profile'
    }

    render() {
        let {imagePath , firstName, lastName, requestNum } = this.props.items;
    return (
        <div className="w3-row w3-teal nav-wrapper">

            <div className="w3-col info-wrapper">

                <div className="w3-row">
                    <div className="w3-col image-wrapper">
                        <img className="w3-card-2 image-style" src={imagePath || "http://localhost:8000/profile.png"}/>
                    </div>
                    <div className="w3-col name-wrapper">
                        <span className="mine name-style" onClick={this.redirectProfile}> {firstName} {lastName}</span>
                    </div>
                </div>

            </div>

            <div className="w3-col w3-xxlarge sh-topnav-title-container" onClick={this.redirectHome}>
                ReferME
            </div>

            <div className="w3-col w3-right signout-wrapper">
                <span className="mine name-style" onClick={this.redirectSignout}>Signout</span>
            </div>

            <div className="w3-col w3-right request-wrapper">
                <span className="mine name-style" onClick={this.redirectRequests}>Requests</span>
                <span className="w3-yellow w3-small mine comp__11">{requestNum || '0' }</span>
            </div>
            <div className="w3-col w3-right comp22">
                <span className="mine name-style" onClick={this.redirectHome}>Home</span>
            </div>
        </div>
      );
  }
}

export default TopNav;