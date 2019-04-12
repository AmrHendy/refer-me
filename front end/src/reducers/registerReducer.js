import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/actionTypes";

let initialState = { loggedInUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function register(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      console.log("Successfully registered", action.loggedInUser);
      return { loggedInUser: action.loggedInUser };
    case REGISTER_FAILED:
      console.log("Error in registering");
      return { loggedInUser: null };
    default:
      return state;
  }
}

export default register;
