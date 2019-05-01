import React from "react";

import Sidenav from "./sidenav";
import OfficeCard from "./OfficeCard";
import TopNav from "./topnav";
import RequestModal from "./RequestModal";

import getRequestNum from "../../services/getRequestNum";
import store from '../../helpers/store'

import filterJobs from '../../services/filterJobsService'
import searchRequest from "../../actions/creators/searchActions";

import sendReferRequest from '../../services/sendReferRequestService'


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
          filteredJobs: [],

          requestReferInfo: {recipientUserId: null, company: '', city: '', country: '', position: '', message: ''},
          displayModal: false,
        }  
  
      this.getData = this.getData.bind(this);
      this.displayRequestModal = this.displayRequestModal.bind(this);
      this.cancelModal = this.cancelModal.bind(this);
      this.submitModal = this.submitModal.bind(this);
      this.submitReuqestRefer = this.submitReuqestRefer.bind(this);
      store.subscribe(() => this.getData() );
  }

  componentDidMount(){
      // at the start of the component we fetch data and set local state
  }
   
  componentWillMount(){
    // init default filtered jobs
    // let response = filterJobs("", "");
    // this.props.dispatch(searchRequest(response));

    this.getData();
    store.subscribe(() => this.getData() );
  }

  getData() {
    //let requestNum = getRequestNum(); 
    let requestNum = 5;
    this.setState({
      navItems:{ 
        // imagePath, first_name, last_name ---> global state retrival 
        ...store.getState().loggedInUser,
        requestNum: requestNum
      },
      filteredJobs: store.getState().filteredJobs
    });
  }


  displayRequestModal(requestReferInfo){
    // user id, company, position, city, country,  message
    this.setState({displayModal: true});
    this.setState({requestReferInfo: requestReferInfo});
  }

  cancelModal(){
    this.setState({displayModal: false});
    this.setState({requestReferInfo: null});
  }

  submitModal(info){
    this.setState({displayModal: false});
    this.setState({requestReferInfo: info});
    this.submitReuqestRefer();
  }

  submitReuqestRefer(){
    let info = this.state.requestReferInfo;
    let response = sendReferRequest(info);
    if(response.status === "success"){
      alert("Success Adding request refer");
    }
    else{
      alert("Error Adding request refer ,, try again");
    }
  }

  render() {
    let navItems = { ...this.state.navItems };
    let filteredJobs = this.state.filteredJobs;
    console.log(this.state);

    return (
        <React.Fragment>
            <TopNav items= {navItems}/>
            <Sidenav/>
            {filteredJobs.map((job) => {
              return <OfficeCard company={job.company} office={job.office} employees={job.employees} displayRequestModal={this.displayRequestModal}/>
            })}
            {this.state.displayModal ? <RequestModal cancel={this.cancelModal} sumbit={this.submitModal}/> : null}
        </React.Fragment>
      );
  }
}

export default HomePage;
