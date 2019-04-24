import $ from "jquery";

function updateProfile(email, password, firstName, lastName) {

    let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/profile/update_profile",
      data: { user_email: email, user_password: password, user_firstName: firstName, user_lastName: lastName },
      async: false
    }).responseText
  );
  return response;
}

export default updateProfile;
