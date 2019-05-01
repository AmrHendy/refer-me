import $ from "jquery";

function sendreferRequest(referRequestInfo) {
  let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/home/view/refer_request/submit",
      data: {
        ...referRequestInfo
      },
      async: false
    }).responseText
  );
  return response;
}

export default sendreferRequest;
