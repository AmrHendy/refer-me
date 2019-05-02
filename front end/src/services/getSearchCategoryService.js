import $ from "jquery";

function getSearchCategoryValues(){
    let response = JSON.parse(
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8001/home/search/init/get_search_data",
      async: false
    }).responseText
  );
  
  return response;
}

export default getSearchCategoryValues;
