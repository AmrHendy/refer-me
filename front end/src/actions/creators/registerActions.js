import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actionTypes";

// user object contain user.firstName, user.lastName, user.email, user.password
// return the action which we will call a dispatch on it later.
function registerRequest(response) {
  // it will return onject of {status: 'success' or 'error'}
  if (response.status === "success") {
    return { type: REGISTER_SUCCESS, loggedInUser: response.user };
  } else if (response.status === "error") {
    return { type: REGISTER_FAILED, loggedInUser: null };
  }
}
export default registerRequest;
