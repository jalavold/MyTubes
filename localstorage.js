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

function loadddlCategories(){
    if (localStorage.getItem("videosbycat") != null) {
        var categories = JSON.parse(localStorage.getItem("videosbycat"));
        var ddlCategories = document.getElementById("ddlCategories");
        ddlCategories.style.ic
        while (ddlCategories.hasChildNodes()){
            ddlCategories.removeChild(ddlCategories.lastChild);
        }

        for (catobj in categories.categories){   
            var newoption = document.createElement("option");
            newoption.value = categories.categories[catobj].catName;
            newoption.innerHTML = categories.categories[catobj].catName;
            ddlCategories.appendChild(newoption);
        }
    } else {
        var ddlCategories = document.getElementById("ddlCategories");
        var newoption = document.createElement("option");
        newoption.value = "none";
        newoption.innerHTML = "NONE";
        ddlCategories.appendChild(newoption);
        var catformmessage = document.getElementById("catformmessage");
        catformmessage.textContent = "No categories defined. Please provide a category name and depress the \"New Category\" button.";
        catformmessage.style.color = "red";
    }
}


function savenewcat(){
    var newcat = document.getElementById("newcat");
    var catformmessage = document.getElementById("catformmessage")
    if (newcat.value === ""){
        catformmessage.textContent = "Please provide a new category name and try again."
        catformmessage.style.color = "red";
    } else {
            if(typeof(Storage) !== "undefined") {
            if (localStorage.getItem("videosbycat") === null) {
                var catobj={catName:newcat.value,videosArray:[]};
                var newcategory = {categories:[catobj]};
                localStorage.setItem("videosbycat", JSON.stringify(newcategory));
            } else {
                
                var categories = JSON.parse(localStorage.getItem("videosbycat"));
                var existingcategory = false;
                for (catobj in categories.categories){
                    var categoryName = categories.categories[catobj].catName;
                    if (categoryName === newcat.value){
                        existingcategory = true;
                    }
                }

                if(!existingcategory){
                    var catobj={catName:newcat.value,videosArray:[]};
                    categories.categories.push(catobj);
                    localStorage.setItem("videosbycat",JSON.stringify(categories));
                    loadddlCategories();
                    catformmessage.textContent = "New category " + newcat.value + " created successfully!"
                    catformmessage.style.color = "green";
                } else {
                    catformmessage.textContent  = "Sorry, there already is a category named " + newcat.value + ".";
                    catformmessage.style.color = "red";
                }

                /*             for (catobj in categories.categories){
                    var categoryName = categories.categories[catobj].catName;
                    var videosArray = categories.categories[catobj].videosArray;
                    if (categoryName === "cat"){
                        var videoObj = {usertitle:"Cats R Fun", youtubetitle:"you tube cat title", link:"https://embededlink"};
                        videosArray.push(videoObj);
                    }
                } */


                
            }
        } else {
            alert("Sorry, your browser does not support web storage...");
        }
    }

}