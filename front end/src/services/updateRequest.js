import $ from "jquery";

function updateRequest(requestId, newStatus) {
    let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/profile/update_user_info",
      data: { id: requestId, status: newStatus },
      async: false
    }).responseText
  );
  return response;
}

export default updateRequest;
