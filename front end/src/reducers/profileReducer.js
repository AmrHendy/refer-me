import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILED } from "../actions/actionTypes";

let initialState = { loggedInUser: null };

// state of the login reducer is the state.loggedInUser from the global state only.
function updateProfile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      //alert(action.message);
      console.log("Successfully logging, user = ", action.loggedInUser);
      return { loggedInUser: action.loggedInUser };
    case UPDATE_PROFILE_FAILED:
      //alert(action.message);
      console.log("Error in logging");
      return { loggedInUser: null };
    default:  
      return state;
  }
}

export default updateProfile;
