import { LOGIN_REQUEST } from "../actionTypes";

function loginRequest(username, password) {
  // return the action which we will call a dispatch on it later.
  return { LOGIN_REQUEST, username, password };
}
