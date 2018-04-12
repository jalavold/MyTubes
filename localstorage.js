function loadddlCategories(){
    if (localStorage.getItem("videosbycat") != null) {
        var categories = JSON.parse(localStorage.getItem("videosbycat"));
        var ddlCategories = document.getElementById("ddlCategories");
        var ddlCats = document.getElementById("ddlCats");
        while (ddlCategories.hasChildNodes()){
            ddlCategories.removeChild(ddlCategories.lastChild);
        }
        while (ddlCats.hasChildNodes()){
            ddlCats.removeChild(ddlCats.lastChild);
        }
        var pickopt = document.createElement("option");
        pickopt.value = "Select Category";
        pickopt.innerHTML  = "Select Category";
        pickopt.selected = true;
        ddlCats.appendChild(pickopt);

        var pickopt2 = document.createElement("option");
        pickopt2.value = "Select Category";
        pickopt2.innerHTML  = "Select Category";
        pickopt2.selected = true;
        ddlCats.appendChild(pickopt2);

        for (catobj in categories.categories){   
            var newoption = document.createElement("option");
            newoption.value = categories.categories[catobj].catName;
            newoption.innerHTML = categories.categories[catobj].catName;
            var newoption2 = document.createElement("option");
            newoption2.value = categories.categories[catobj].catName;
            newoption2.innerHTML = categories.categories[catobj].catName;
            ddlCategories.appendChild(newoption);
            ddlCats.appendChild(newoption2);
        }

    } else {
        var ddlCategories = document.getElementById("ddlCategories");
        var ddlCats = document.getElementById("ddlCats");
        var newoption = document.createElement("option");
        newoption.value = "none";
        newoption.innerHTML = "NONE";
        var newoption2 = document.createElement("option");
        newoption2.value = "none";
        newoption2.innerHTML = "NONE";
        ddlCategories.appendChild(newoption);
        ddlCats.appendChild(newoption2);
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
                loadddlCategories();
                catformmessage.textContent = "New category " + newcat.value + " created successfully!"
                catformmessage.style.color = "green";
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

function savevideotocat(){
    var categories = JSON.parse(localStorage.getItem("videosbycat"));
    var youtubetitle = document.getElementById("youtubetitle");
    var urllink = document.getElementById("urllink");
    var usersubtitle = document.getElementById("usersubtitle");
    var ddlcat = document.getElementById("ddlCategories");
    for (catobj in categories.categories){
        var categoryName = categories.categories[catobj].catName;
        var videosArray = categories.categories[catobj].videosArray;
        if (categoryName === ddlcat.value){
            var videoObj = {usertitle:usersubtitle.value, youtubetitle:youtubetitle.innerText, link:urllink.innerText};
            videosArray.push(videoObj);
            localStorage.setItem("videosbycat",JSON.stringify(categories));
            document.getElementById("addvideomessage").textContent = "Video added category successfully!"
            document.getElementById("addvideomessage").style.color = "green";
        }
    }
    loadddlCategories();
}

function showcatvideos(){
    var ddlcats = document.getElementById("ddlCats");
    document.getElementById("videosbycategorymessage").textContent = "";
    if(ddlcats.value === "Select Category"){
        document.getElementById("videosbycategorymessage").textContent = "Invalid Selection. Please Select a valid Category";
        document.getElementById("videosbycategorymessage").style.color = "red";
    }else{
        var categories = JSON.parse(localStorage.getItem("videosbycat"));
        var catvideos = document.getElementById("catvideos");
        while (catvideos.hasChildNodes()){
            catvideos.removeChild(catvideos.lastChild);
        }
        for (catobj in categories.categories){
            var categoryName = categories.categories[catobj].catName;
            var videosArray = categories.categories[catobj].videosArray;
            if (categoryName === ddlcats.value){
                for (video in videosArray){
                    var brelem = document.createElement("br");
                    var iframe = document.createElement("iframe");
                    var span= document.createElement("span");
                    span.textContent = videosArray[video].usersubtitle;
                    iframe.src = videosArray[video].link;
                    iframe.frameBorder = 0;
                    iframe.height = "480px";
                    iframe.width = "100%";
                    iframe.style.display = "inline-block";
                    iframe.style.margin = "auto";
                    iframe.setAttribute("allow","autoplay");
                    iframe.setAttribute("allowFullScreen","");
                    document.getElementById("catvideos").appendChild(span);
                    document.getElementById("catvideos").appendChild(iframe);
                    document.getElementById("catvideos").appendChild(brelem);
                }
            }
        }
    }
}
