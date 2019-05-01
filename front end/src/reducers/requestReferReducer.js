import { DISPLAY_REQUEST_REFER } from "../actions/actionTypes";

let initialState = { requestReferInfo: null };

function requestRefer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_REQUEST_REFER:
      return { requestReferInfo: action.requestReferInfo };
    default:
      return state;
  }
}

export default requestRefer;
