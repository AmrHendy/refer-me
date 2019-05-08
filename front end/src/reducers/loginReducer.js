import { LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/actionTypes";

let initialState = { loggedInUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      //alert(action.message);
      //console.log("Successfully logging, user = ", action.loggedInUser);
      localStorage.setItem('email', action.loggedInUser.email);
      return { loggedInUser: action.loggedInUser };
    case LOGIN_FAILED:
      //alert(action.message);
      //console.log("Error in logging");
      localStorage.setItem('email', null);
      return { loggedInUser: null };
    default:  
      return state;
  }
}

export default login;
