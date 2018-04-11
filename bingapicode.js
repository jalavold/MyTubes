// API subscription key

var key = "7f3ea969a9284c518b17a2f31f03f9e5";


function bingWebSearch(query, options, key) {

    // scroll to top of window
    window.scrollTo(0, 0);
    if (!query.trim().length) return false;     // empty query, do nothing



    var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/videos/search";
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

    // event handler for successful response
    request.addEventListener("load", handleOnLoad);

    // event handler for erorrs
    //request.addEventListener("error", function() {
    //    renderErrorMessage("Error completing request");
    //});

    // event handler for aborted request
    //request.addEventListener("abort", function() {
    //    renderErrorMessage("Request aborted");
    //});

    // send the request
    request.send();
    return false;
}


// build query options from the HTML form
function bingSearchOptions(form) {

    var options = [];
    options.push("pricing=free")
    options.push("SafeSearch=strict");
    options.push("count=10");
    options.push("textDecorations=true");
    options.push("textFormat=HTML");
    return options.join("&");
}


// perform a related search (used by related search links)
function searchBing() {
    var query = "site:youtube.com '" + document.getElementById("query").value + "'";
    var videos = document.getElementById("videos");
    while (videos.hasChildNodes()){
        videos.removeChild(videos.lastChild);
    }
    return bingWebSearch(query, bingSearchOptions(), key);
}

function handleOnLoad() {

    var json = this.responseText.trim();
    var jsobj = {};

    // try to parse JSON results
    try {
        if (json.length) jsobj = JSON.parse(json);
    } catch(e) {
        renderErrorMessage("Invalid JSON response");
    }

   

    // show raw JSON and headers
    //document.getElementById("jsondump").innerHTML = formatwithpre(JSON.stringify(jsobj, null, 2));
    for (video in jsobj.value){
        var brelem = document.createElement("br");
        var iframe = document.createElement("iframe");
        var btn = document.createElement("button");
        btn.innerHTML="Save";
        var onclickstring="function(){addvideoform('" + jsobj.value[video].name + "', '" + jsobj.value[video].contentUrl.replace("watch?v=","embed/") + "')}";
        btn.setAttribute('onclick', onclickstring);
        iframe.src = jsobj.value[video].contentUrl.replace("watch?v=","embed/");
        iframe.frameBorder = 0;
        iframe.height = "360px";
        iframe.width = "640px";
        iframe.setAttribute("allow","autoplay");
        iframe.setAttribute("allowFullScreen","");
        document.getElementById("videos").appendChild(iframe);
        document.getElementById("videos").appendChild(btn);
        document.getElementById("videos").appendChild(brelem);
    }
}

function addvideoform(youtubetitle, link){
    document.getElementById("youtubetitle").value = youtubetitle.value;
    document.getElementById("urllink").value = link.value;
    addvideoformview();
}

// escape quotes to HTML entities for use in HTML tag attributes
function escapeQuotes(text) {
    return text.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
}

// get the host portion of a URL, strpping out search result formatting and www too
function getHost(url) {
    return url.replace(/<\/?b>/g, "").replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
}

// format plain text for display as an HTML <pre> element
function formatwithpre(text) {
    text = "" + text;
    return "<pre>" + text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</pre>"
}


