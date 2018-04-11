
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
    
}
