import $ from "jquery";

function login(email, password) {
  let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/signin/submit/",
      data: { user_email: email, user_password: password },
      async: false
    }).responseText
  );
  return response;
}

export default login;
