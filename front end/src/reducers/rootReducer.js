import { combineReducers } from "redux";

import login from "./loginReducer";
import filterJobs from "./searchReducer";

const rootReducer = combineReducers({
  loggedInUser: login,
  filteredJobs: filterJobs,
});

export default rootReducer;
