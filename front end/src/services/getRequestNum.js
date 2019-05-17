import $ from "jquery";

function getRequestNum() {
    let response = JSON.parse(
    $.ajax({
      type: "POST",
      data: {email: localStorage.getItem('email')},
      url: "http://127.0.0.1:8001/topnav/get_request_count",
      async: false
    }).responseText
  );
  return response;
}

export default getRequestNum;
