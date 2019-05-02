import $ from "jquery";

function addPosition(positionInfo){
    let response = JSON.parse(
        $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8001/profile/add_new_position",
        data: positionInfo,
        async: false
        }).responseText
    );
    return response;
}
  
export default addPosition;
  