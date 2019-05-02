import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/actionTypes";

let initialState = { loggedInUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function register(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      //alert(action.message);
      console.log("Successfully registered", action.loggedInUser);
      localStorage.setItem('email', action.loggedInUser.email);
      return { loggedInUser: action.loggedInUser };
    case REGISTER_FAILED:
      //alert(action.message);
      console.log("Error in registering");
      localStorage.setItem('email', null);
      return { loggedInUser: null };
    default:
      return state;
  }
}

export default register;
