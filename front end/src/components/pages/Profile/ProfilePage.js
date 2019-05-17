import React from "react";
import { connect } from "react-redux";

import TopNav from "../../layout/topnav";
import ProfileCard from "./ProfileCard";
import PostionCard from "./PositionCard";
import PositionModal from "./PositionModal";
import './PositionCard.css'

import getProfileData from '../../../services/getProfileDataService'
import checkLogin from '../../../services/checkLoginService';
import getRequestNum from "../../../services/getRequestNum";

import store from '../../../helpers/store'



class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems : {
        imagePath: 'http://localhost:8000/profile.png',
        firstName: 'Shaaban',
        lastName: 'Shaapan',
        requestNum: ''
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
      ],
      displayModal: false
    }
    checkLogin(false);
    this.getData = this.getData.bind(this);
    this.addPosition = this.addPosition.bind(this);
  }

  componentWillMount(){
    if(!checkLogin(false)){
      this.getData();
      store.subscribe(() => this.getData() );
    }
  }
  getData() {
    let response = getProfileData();        
    this.setState({
      navItems:{ 
        // imagePath, first_name, last_name ---> global state retrival 
        imagePath: response.user_info.img_link,
        firstName: response.user_info.first_name,
        lastName: response.user_info.last_name,
        requestNum: getRequestNum().request_count
      },
      cardItems: {
        // imagePath, first_name, last_name, email ---> global state retrival 
        firstName: response.user_info.first_name,
        lastName: response.user_info.last_name,
        email: response.user_info.email,
        imagePath: response.user_info.img_link,
        password: response.user_info.password,
        resumeLink: response.user_info.resume_link
      },
      positions: response.positions_held
    });

  }

  addPosition(){
    this.setState({'displayModal': true});
  }

  render() {
    let navItems = { ...this.state.navItems };
    let cardItems = { ...this.state.cardItems };
    
    return (
      <React.Fragment>
          <TopNav items= {navItems}/>
          <div className="w3-row comp111">
            <ProfileCard items = {cardItems}/>
            <div className="w3-container positionCard-comp1">

              <div className="w3-xlarge w3-padding-16 positionCard-comp2">Positions Held</div>
              {this.state.positions.map( (position) => {
                return <PostionCard items={position} />
            } )}
              <div>
                <button className="w3-btn w3-teal" onClick={this.addPosition}>Add Position</button>
              </div>
            </div>
          </div>
          {this.state.displayModal ? <PositionModal/> : null}
      </React.Fragment>
    );
  }
}


const connectedProfilePage = connect(
  null,
  null
)(ProfilePage);

export default connectedProfilePage;
