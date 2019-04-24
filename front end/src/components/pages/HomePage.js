import React from "react";
import Sidenav from "./sidenav";
import OfficeCard from "./OfficeCard";



class HomePage extends React.Component {


    constructor(props){
        super(props)  
    }

    componentDidMount(){
        // at the start of the component we fetch data and set local state
    }
    
  render() {
    return (
        <div className='w3-row'>
            <Sidenav/>
            <OfficeCard/>
        </div>
      );
  }
}

export default HomePage;
