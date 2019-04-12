import $ from "jquery";

function register(user) {
  console.log("Sending resgitser request");
  let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/signup/submit/",
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        user_email: user.email,
        user_password: user.password
      },
      async: false
    }).responseText
  );
  return response;
}

export default register;
