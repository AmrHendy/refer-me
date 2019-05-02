import React from "react";

import './sidenav.css'; 
import getSearchCategoryValues from '../../services/getSearchCategoryService'
import filterJobs from '../../services/filterJobsService'
import searchRequest from "../../actions/creators/searchActions";


class Sidenav extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      company_list: [],
      country_list: [],
      employee_list: [],
      search_criteria: 'country_list',
      chosen_search_criteria_results: [],
      search_query: '',
      chosen_search_query: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
    this.changeSearchCriteria = this.changeSearchCriteria.bind(this);  
  }
  
  componentWillMount(){
    // make ajax request to get the data
    this.getData();
  }

  handleChange(e){
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  getData(){
    let response = getSearchCategoryValues();
    this.setState({...response, chosen_search_criteria_results: response.country_list});
  }

  changeSearchCriteria(e){
    e.preventDefault();
    const { name, value } = e.target;
    // request ajax request to filter jobs by value and category
    this.setState({ search_criteria: value })
    switch (value){
      case 'country_list':
        this.setState({ chosen_search_criteria_results : this.state.country_list});
        break;
      case 'company_list':
        this.setState({ chosen_search_criteria_results : this.state.company_list});
        break;
      case 'employee_list':
        this.setState({ chosen_search_criteria_results : this.state.employee_list});
        break;
    }
  }

  filterJobs(e){
    const {name, value} = e.target;
    this.setState({chosen_search_query: value});
    let response = filterJobs(this.state.search_criteria, this.state.chosen_search_query);
    this.props.dispatch(searchRequest(response));
  }

  render() {
    return (
      <div className="w3-col w3-card-2 w3-round-large w3-container wrapper-div">
        <div className="w3-large search-div">
          Search Website
        </div>
        <input className="w3-input w3-border" type="text" name="search_query" onChange={this.handleChange} value={this.state.search_query}/>
        <select className="w3-btn w3-white w3-round-large w3-border w3-right w3-small select-style" name="search_criteria" onChange={this.changeSearchCriteria}>
          <option value="country_list" selected>country</option>
          <option value="company_list">company</option>
          <option value="employee_list">people</option>
        </select>
        <div className="w3-large result-div">
          Result
        </div>
        <div className="w3-round company-div">
          <table className="w3-round">
          {this.state.chosen_search_criteria_results.map((value) => {
            return value.startsWith(this.state.search_query) ? <tr> <td name="chosen_search_query" onClick={this.filterJobs}> {value}</td> </tr> : null;
          })}
          </table>
        </div>
      </div>
      );
  }
}

export default Sidenav;
