import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILED } from "../actionTypes";

// return the action which we will call a dispatch on it later.
function updateProfileRequest(response) {
  // TODO call the backend with the email and password.
  // it will return onject of {user: logged in user or null, status: 'success' or 'error'}
  if (response.status === "success") {
    return {
      type: UPDATE_PROFILE_SUCCESS,
      loggedInUser: response.user,
      message: response.msg
    };
  } else if (response.status === "error") {
    return { type: UPDATE_PROFILE_FAILED, loggedInUser: null, message: response.msg };
  }
}

export default updateProfileRequest;
