// API subscription key

var key = "7f3ea969a9284c518b17a2f31f03f9e5";


function bingWebSearch(query, options, key) {

    // scroll to top of window
    window.scrollTo(0, 0);
    if (!query.trim().length) return false;     // empty query, do nothing



    var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/videos";
    var request = new XMLHttpRequest();
    var queryurl = endpoint + "?q=" + encodeURIComponent(query) + "&" + options;

    // 
    try {
        request.open("GET", queryurl);
    } 
    catch (e) {
        renderErrorMessage("Bad request (invalid URL)\n" + queryurl);
        return false;
    }

    // add request headers
    request.setRequestHeader("Ocp-Apim-Subscription-Key", key);
    request.setRequestHeader("Accept", "application/json");
    var clientid = retrieveValue(CLIENT_ID_COOKIE);
    if (clientid) request.setRequestHeader("X-MSEdge-ClientID", clientid);

    // event handler for successful response
    request.addEventListener("load", handleOnLoad);

    // event handler for erorrs
    request.addEventListener("error", function() {
        renderErrorMessage("Error completing request");
    });

    // event handler for aborted request
    request.addEventListener("abort", function() {
        renderErrorMessage("Request aborted");
    });

    // send the request
    request.send();
    return false;
}


// build query options from the HTML form
function bingSearchOptions(form) {

    var options = [];
    options.push("SafeSearch=strict");
    options.push("count=10");
    options.push("textDecorations=true");
    options.push("textFormat=HTML");
    return options.join("&");
}


// perform a related search (used by related search links)
function searchBing() {
    var query = document.getElementById("query").value;
    return bingWebSearch(query, bingSearchOptions(), key);
}
