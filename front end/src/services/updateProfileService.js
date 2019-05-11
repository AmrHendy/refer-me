import $ from "jquery";

function updateProfile(old_email, email, password, firstName, lastName) {
  let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/profile/update_user_info",
      data: {
        old_email: old_email,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      },
      async: false
    }).responseText
  );
  return response;
}

export default updateProfile;
