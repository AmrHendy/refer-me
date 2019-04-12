import { LOGIN_SUCCESS, LOGIN_FAILED } from "../actionTypes";

// return the action which we will call a dispatch on it later.
function loginRequest(response) {
  // TODO call the backend with the email and password.
  // it will return onject of {user: logged in user or null, status: 'success' or 'error'}
  if (response.status === "success") {
    return { type: LOGIN_SUCCESS, loggedInUser: response.user };
  } else if (response.status === "error") {
    return { type: LOGIN_FAILED, loggedInUser: null };
  }
}

export default loginRequest;
