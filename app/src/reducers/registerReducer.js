import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/actionTypes";

let initialState = { lastRegisteredUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function register(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      console.log("Successfully registered", action.lastRegisteredUser);
      return { lastRegisteredUser: action.lastRegisteredUser };
    case REGISTER_FAILED:
      console.log("Error in registering");
      return { lastRegisteredUser: null };
    default:
      return state;
  }
}

export default register;
