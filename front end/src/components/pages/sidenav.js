import React from "react";

import './sidenav.css'; 


class Sidenav extends React.Component {

  constructor(props){
    super(props)
    this.state = {companies: ['google', 'facebook', 'amazon']}
  }
  
  componentDidMount(){
    // make ajax request to get the data
  }
  
  render() {
    return (
      <div className="w3-col w3-card-2 w3-round-large w3-container wrapper-div">
        <div className="w3-large search-div">
          Search Website
        </div>
        <input className="w3-input w3-border" type="text" name="search_query" />
        <select className="w3-btn w3-white w3-round-large w3-border w3-right w3-small select-style" name="search_criteria">
          <option value="country">country</option>
          <option value="company">company</option>
          <option value="people">people</option>
        </select>
        <div className="w3-large result-div">
          Result
        </div>
        <div className="w3-round company-div">
          <table className="w3-round">
          {this.state.companies.map((value) => {
            return <tr> <td>{value}</td> </tr>
          })}
          </table>
        </div>
      </div>
      );
  }
}

export default Sidenav;
