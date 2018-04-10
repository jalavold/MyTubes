function onclickUsers() {
    var userinfoobj = {};
    userinfoobj.firstname = document.getElementById("firstname").value;
    userinfoobj.lastname = document.getElementById("lastname").value;
    userinfoobj.email = document.getElementById("email").value;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.getItem("jsonstring") === null) {

            localStorage.setItem("jsonstring", JSON.stringify(userinfoobj));
        } else {
            localStorage.setItem("jsonstring", localStorage.getItem("jsonstring") + "," + JSON.stringify(userinfoobj));
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
    }

    var jsonDataObj = JSON.parse("[" + localStorage.getItem("jsonstring") + "]");
    writehtml(jsonDataObj);
    document.getElementById("firstname").value="";
    document.getElementById("lastname").value="";
    document.getElementById("email").value="";
}

// This function takes the ojbects value passed to it and generates the page's additional HTML.
// For loop isused to access the value of each key/value pair and generates the table HTML.
function writehtml (jsonDataObj){
    var htmltable = "<table>";
    htmltable += "<tr><th>First Name</th><th>Last Name</th><th>E-Mail</th></tr>";
    for (var inc = 0 ; inc < jsonDataObj.length ; inc++){
        htmltable += "<tr><td>" + jsonDataObj[inc].firstname + "</td><td>" + jsonDataObj[inc].lastname + "</td><td>" + jsonDataObj[inc].email + "</td></tr>";
    }
    htmltable += "</table>";
    document.getElementById("jsonstringify").innerHTML = JSON.stringify(jsonDataObj);
    document.getElementById("userTable").innerHTML = htmltable;
}


function savenewcat(){
    var newcat = document.getElementById("newcat");

    if(typeof(Storage) !== "undefined") {
        if (localStorage.getItem("videosbycat") === null) {
            var videosbycatObj = '{"categories":["' + newcat + ':[]}"}';
            localStorage.setItem("videosbycat", JSON.stringify(videosbycatObj));
        } else {
            var videosbycatObj = JSON.parse(localStorage.getItem("videosbycat"));
            localStorage.setItem("videosbycat",JSON.stringify(userinfoobj));
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
}