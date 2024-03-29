import React from "react";
import { connect } from "react-redux";

import "./sidenav.css";
import getSearchCategoryValues from "../../../services/getSearchCategoryService";
import filterJobs from "../../../services/filterJobsService";
import searchRequest from "../../../actions/creators/searchActions";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_list: [],
      country_list: [],
      employee_list: [],
      search_criteria: "country_list",
      chosen_search_criteria_results: [],
      search_query: "",
      chosen_search_query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
    this.changeSearchCriteria = this.changeSearchCriteria.bind(this);
  }

  componentWillMount() {
    // make ajax request to get the data
    this.getData();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  getData() {
    let response = getSearchCategoryValues();
    let items = response.country_list.map((item, index) => {
      return { key: `country_list_${item}`, value: item };
    });
    this.setState({
      ...response,
      chosen_search_criteria_results: items
    });
  }

  changeSearchCriteria(e) {
    e.preventDefault();
    const { name, value } = e.target;
    alert("changing crieria" + value);
    this.setState({ search_criteria: value });
    let items;
    switch (value) {
      case "country_list":
        items = this.state.country_list.map((item, index) => {
          return { key: `${value}_${item}`, value: item };
        });
        break;
      case "company_list":
        items = this.state.company_list.map((item, index) => {
          return { key: `${value}_${item}`, value: item };
        });
        break;
      case "employee_list":
        items = this.state.employee_list.map((item, index) => {
          return { key: `${value}_${item}`, value: item };
        });
        break;
    }
    this.setState({ chosen_search_criteria_results: items });
  }

  filterJobs(e) {
    e.preventDefault();
    const value = e.target.dataset.value;
    this.setState({ chosen_search_query: value, search_query: value });
    let response = filterJobs(this.state.search_criteria, value);
    this.props.dispatch(searchRequest(response));
  }

  render() {
    return (
      <div className="w3-border w3-round-large w3-container wrapper-div sh-home-sidenav-container">
        <div className="w3-large search-div">Search Website</div>
        <input
          className="w3-input w3-border"
          type="text"
          name="search_query"
          onChange={this.handleChange}
          value={this.state.search_query}
        />
        <select
          className="w3-btn w3-white w3-round-large w3-border w3-right w3-small select-style"
          name="search_criteria"
          onChange={this.changeSearchCriteria}
          value={this.state.search_criteria}>
          <option value="country_list">country</option>
          <option value="company_list">company</option>
          <option value="employee_list">people</option>
        </select>
        <div className="w3-large result-div">Result</div>
        <div className="w3-round company-div">
          <table className="w3-round">
            <tbody>
              {this.state.chosen_search_criteria_results.map(item => {
                return item.value.startsWith(this.state.search_query) ? (
                  <tr key={`tr_${item.key}`}>
                    <td
                      key={item.key}
                      onClick={this.filterJobs}
                      data-value={item.value}>
                      {item.value}
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const connectedSideNav = connect(
  null,
  null
)(Sidenav);

export default connectedSideNav;
