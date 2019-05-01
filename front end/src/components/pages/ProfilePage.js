import React from "react";
import TopNav from "./topnav";
import ProfileCard from "../layout/ProfileCard";
import PostionCard from "../layout/PositionCard";

import { connect } from "react-redux";

import getProfileData from '../../services/getProfileDataService'

import '../layout/PositionCard.css'
import getRequestNum from "../../services/getRequestNum";

import store from '../../helpers/store'



class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems : {
        imagePath: 'http://localhost:8000/profile.png',
        firstName: 'Shaaban',
        lastName: 'Shaapan',
        requestNum: 10
      },
      cardItems: {
        imagePath: 'http://localhost:8000/profile.png',
        firstName: 'Shaaban',
        lastName: 'Shaapan',
        email: 'shaapan@deepmind.com',
        password: '0123456789',
        resumeLink: 'http://localhost:8000/resume.pdf'
      },
      positions: [
        {
          imagePath: 'http://localhost:8000/google.png',
          company: 'Google',
          office: 'Google Germany', 
          position: 'CEO',
          date: '2015 - 2016'
        },
        
        {
          imagePath: 'http://localhost:8000/google.png',
          company: 'Google',
          office: 'Google Dublin', 
          position: 'CEO',
          date: '2015 - 2016'
        }
      ]
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount(){
    store.subscribe(() => this.getData() );
  }

  getData() {
    let response = getProfileData();
    let requestNum = getRequestNum();
    // response = {
    //             user_info: {first_name, last_name, email, password, img_link, resume_link },
    //            positions_held: [ {company , office, position, date, imagePath }, ...] }
        
    this.setState({
      navItems:{ 
        
        // imagePath, first_name, last_name ---> global state retrival 
        
        ...store.getState().loggedInUser,
        requestNum: requestNum
      },
      cardItems: {
        
        // imagePath, first_name, last_name, email ---> global state retrival 
        
        ...store.getState().loggedInUser,
        password: response.user_info.password,
        resumeLink: response.user_info.resume_link
      },
      positions: response.positions_held
    });

  }

  render() {
    console.log(this.state);
    let navItems = { ...this.state.navItems };
    let cardItems = { ...this.state.cardItems };
    
    return (
      <div>
          <TopNav items= {navItems}/>
          <ProfileCard items = {cardItems}/>
          <div className="w3-col w3-container positionCard-comp1">

            <div className="w3-xlarge w3-padding-16 positionCard-comp2">Positions Held</div>
            {this.state.positions.map( (position) => {
              return <PostionCard items={position} />
          } )}
          </div>
      </div>
    );
  }
}


const connectedProfilePage = connect(
  null,
  null
)(ProfilePage);

export default connectedProfilePage;
