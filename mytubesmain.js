
function toggleDivVis() {
    var hidetest = document.getElementById("hidetest");
    if (hidetest.hidden){
        hidetest.hidden=false;
    }else{
        hidetest.hidden=true;
    }
    
}

function showmenu(divref) {
    var menudiv = document.getElementById("menudiv")
    menudiv.style.width = "100%";
    menudiv.style.color = "white";

}

function hidemenu() {
    var menudiv = document.getElementById("menudiv")
    menudiv.style.width = "0%";
    menudiv.style.color = "black";
}

function onbodyloadcode(){
    loadddlCategories();
    resetelements();
    mainview();
}

function showhidediv(divref, truefalseval){
    divref.hidden = truefalseval;
}

function resetelements(){
    document.getElementById("newcat").value = "";
    document.getElementById("query").value = "";
    var videos = document.getElementById("videos");
    var catvideos = document.getElementById("catvideos");
    while (videos.hasChildNodes()){
        videos.removeChild(videos.lastChild);
    }
    while (catvideos.hasChildNodes()){
        catvideos.removeChild(catvideos.lastChild);
    }
    var ddlCategories = document.getElementById("ddlCategories");
    var ddlCats = document.getElementById("ddlCats");
    document.getElementById("ddlCats").selectedIndex = 0;
    document.getElementById("ddlCategories").selectedIndex = 0;
    document.getElementById("searchresults").style.visibility = "hidden";  
}

function mainview(){
    showhidediv(document.getElementById("maindiv"),false);
    showhidediv(document.getElementById("querydiv"),true);
    showhidediv(document.getElementById("catform"),true);
    showhidediv(document.getElementById("addvideoform"),true);
    showhidediv(document.getElementById("videosbycategory"),true);
    resetelements();
    hidemenu();
}

function searchyoutubeview(){
    searchyoutube();
    resetelements();
    hidemenu();
}

function searchyoutube(){
    showhidediv(document.getElementById("maindiv"),true);
    showhidediv(document.getElementById("querydiv"),false);
    showhidediv(document.getElementById("catform"),true);
    showhidediv(document.getElementById("addvideoform"),true);
    showhidediv(document.getElementById("videosbycategory"),true);
}

function videosbycategoryview(){
/*     var ddlCats = document.getElementById("ddlCats");
    if (ddlCats.innerText === "NO CATEGORIES DEFINED"){
        document.getElementById("navtocatform").style.visibility = "visible";
        document.getElementById("videosbycategorymessage").textContent = "Please click on the button above to create categories you can save videos under.";
        document.getElementById("videosbycategorymessage").style.color = "red";
    }else{
        document.getElementById("navtocatform").style.visibility = "hidden";
        document.getElementById("videosbycategorymessage").textContent = "";
        document.getElementById("videosbycategorymessage").style.color = "green";
    }; */
    showhidediv(document.getElementById("maindiv"),true);
    showhidediv(document.getElementById("querydiv"),true);
    showhidediv(document.getElementById("catform"),true);
    showhidediv(document.getElementById("addvideoform"),true);
    showhidediv(document.getElementById("videosbycategory"),false);
    resetelements();
    hidemenu();
}

function catformview(){
    showhidediv(document.getElementById("maindiv"),true);
    showhidediv(document.getElementById("querydiv"),true);
    showhidediv(document.getElementById("catform"),false);
    showhidediv(document.getElementById("addvideoform"),true);
    showhidediv(document.getElementById("videosbycategory"),true);
    resetelements();
    hidemenu();
}

function addvideoformview(){
    showhidediv(document.getElementById("maindiv"),true);
    showhidediv(document.getElementById("querydiv"),true);
    showhidediv(document.getElementById("catform"),true);
    showhidediv(document.getElementById("addvideoform"),false);
    showhidediv(document.getElementById("videosbycategory"),true);
}

