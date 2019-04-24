import React from "react";
import Sidenav from "./sidenav";
import OfficeCard from "./OfficeCard";
import TopNav from "./topnav";



class HomePage extends React.Component {


    constructor(props){
        super(props)
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
    }

    componentDidMount(){
        // at the start of the component we fetch data and set local state
    }
    
  render() {
    return (
        <div className='w3-row'>
            <TopNav/>
            <Sidenav/>
            <OfficeCard/>
        </div>
      );
  }
}

export default HomePage;
