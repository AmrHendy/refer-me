import $ from "jquery";

function filterJobs(search_criteria, search_term){
    let response = JSON.parse(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8001/home/search",
      data: { search_criteria: search_criteria, search_term: search_term},
      async: false
    }).responseText
  );
  console.log(response);
  return response;
}

export default filterJobs;