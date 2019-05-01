import { FILTER_SEARCH_JOBS } from "../actions/actionTypes";

let initialState = { filteredJobs: [] };

// state of the login reducer is the state.loggedInUser from the global state only.
function filterJobs(state = initialState, action) {
  switch (action.type) {
    case FILTER_SEARCH_JOBS:
      alert(action.message);
      console.log("Successfully filted jobs, jobs = ", action.filteredJobs);
      return { filteredJobs: action.filteredJobs };
    default:  
      return state;
  }
}

export default filterJobs;
