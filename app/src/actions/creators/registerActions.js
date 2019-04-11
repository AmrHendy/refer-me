import { REGISTER_REQUEST } from "../actionTypes";

// user object contain user.firstName, user.lastName, user.username, user.password
function registerRequest(user) {
  // return the action which we will call a dispatch on it later.
  return { REGISTER_REQUEST, user };
}
