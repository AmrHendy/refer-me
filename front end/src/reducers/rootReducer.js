import { combineReducers } from "redux";

import login from "./loginReducer";
import register from "./registerReducer";

const rootReducer = combineReducers({
  loggedInUser: login,
  loggedInUser: register
});

export default rootReducer;
