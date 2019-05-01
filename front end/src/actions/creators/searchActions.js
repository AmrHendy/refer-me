import { FILTER_SEARCH_JOBS } from "../actionTypes";

// return the action which we will call a dispatch on it later.
function searchRequest(response) {  
    return {
        type: FILTER_SEARCH_JOBS,
        filteredJobs: response.position_list,
        message: response.msg
    };
}

export default searchRequest;
