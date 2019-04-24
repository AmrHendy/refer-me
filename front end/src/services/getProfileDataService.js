import $ from "jquery";

function getProfileData() {

    let response = JSON.parse(
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8001/profile/get_profile",
      async: false
    }).responseText
  );
  return response;
}

export default getProfileData;
