import { DISPLAY_REQUEST_REFER} from "../actionTypes";

function displayRequestRefer(response) {
    return {
        type: DISPLAY_REQUEST_REFER,
        requestReferInfo: response
    };
}
export default displayRequestRefer;
