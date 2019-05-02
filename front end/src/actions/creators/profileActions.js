import { LOGIN_SUCCESS } from "../actionTypes";

function updateProfileRequest(response) {
  if (response.status === "success") {
    return {
      type: LOGIN_SUCCESS,
      loggedInUser: response.user,
      message: response.msg
    };
  } else if (response.status === "error") {
    return { type: LOGIN_SUCCESS, loggedInUser: null, message: response.msg };
  }
}

export default updateProfileRequest;
