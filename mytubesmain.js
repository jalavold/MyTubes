
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
    while (videos.hasChildNodes()){
        videos.removeChild(videos.lastChild);
    }
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
    showhidediv(document.getElementById("maindiv"),true);
    showhidediv(document.getElementById("querydiv"),false);
    showhidediv(document.getElementById("catform"),true);
    showhidediv(document.getElementById("addvideoform"),true);
    showhidediv(document.getElementById("videosbycategory"),true);
    resetelements();
    hidemenu();
}

function videosbycategoryview(){
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

