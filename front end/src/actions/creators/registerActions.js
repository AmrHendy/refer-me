import { LOGIN_SUCCESS, LOGIN_FAILED } from "../actionTypes";

// user object contain user.firstName, user.lastName, user.email, user.password
// return the action which we will call a dispatch on it later.
function registerRequest(response) {
  // it will return onject of {status: 'success' or 'error'}
  if (response.status === "success") {
    return {
      type: LOGIN_SUCCESS,
      loggedInUser: response.user,
      message: response.msg
    };
  } else if (response.status === "error") {
    return { type: LOGIN_FAILED, loggedInUser: null, message: response.msg };
  }
}
export default registerRequest;
