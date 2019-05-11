import $ from "jquery";

function getRequests(email){
    let response = JSON.parse( 
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8001/requests/init/get_requests",
        data: { email : email},
        async: false
    }).responseText
    );
    return response;
}

export default getRequests;
