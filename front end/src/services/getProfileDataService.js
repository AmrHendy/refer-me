import $ from "jquery";

function getProfileData() {
  console.log('sending email', localStorage.getItem('email'));
  let response = JSON.parse(
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8001/profile/get_user_data",
    data: { user_email: localStorage.getItem('email')},
    async: false
  }).responseText
  );
  return response;
}

export default getProfileData;
