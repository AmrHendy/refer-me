import { combineReducers } from "redux";

import login from "./loginReducer";

const rootReducer = combineReducers({ loggedInUser: login });

export default rootReducer;
