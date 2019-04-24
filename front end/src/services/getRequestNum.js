import $ from "jquery";

function getRequestNum() {
    let response = JSON.parse(
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8001/profile/get_request_num",
      async: false
    }).responseText
  );
  return response;
}

export default getRequestNum;
