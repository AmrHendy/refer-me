import { LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/actionTypes";

let initialState = { loggedInUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(`Successfully logging and user = ${action.loggedInUser}`);
      return { loggedInUser: action.loggedInUser };
    case LOGIN_FAILED:
      console.log("Error in logging");
      return { loggedInUser: null };
    default:
      return state;
  }
}

export default login;
