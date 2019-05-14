import $ from "jquery";

function getRequests(email){
    console.log(`Sending get requests to backend with email ${email}`);
    let response = JSON.parse( 
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8001/requests/get_refer_requests",
        data: { user_email : email},
        async: false
    }).responseText
    );
    return response;
}

export default getRequests;
