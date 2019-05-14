import $ from "jquery";

function updateRequest(requestId, newStatus) {
    let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/requests/handle_recevied_request",
      data: { id: requestId, status: newStatus },
      async: false
    }).responseText
  );
  return response;
}

export default updateRequest;
