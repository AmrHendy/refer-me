import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actionTypes";

// user object contain user.firstName, user.lastName, user.username, user.password
// return the action which we will call a dispatch on it later.
function registerRequest(user) {
  // TODO call the backend with the user.
  // it will return onject of {status: 'success' or 'error'}
  let response = { status: "success" };
  if (response.status === "success") {
    return { type: REGISTER_SUCCESS, lastRegisteredUser: user };
  } else if (response.status === "error") {
    return { type: REGISTER_FAILED };
  }
}
export default registerRequest;
