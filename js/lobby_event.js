function checkGame(){
    var idPartie = $("#gameName").text();
    $.ajax({
        method: "POST",
        url: "../ajax_php/ajax_lobbyRefresh.php",
        data: {nomLobby: idPartie},
        dataType: "html",
        success: function(output){
            if(output == -1){
                window.location.pathname = '../php/membre.php';
            }else{
                var liJ = document.getElementsByClassName("players")[0];

                var arrayJ = JSON.parse(output);
                arrayJ = arrayJ["Joueurs"];
                console.log(arrayJ);

                arrayJ.forEach(function(elem){
                    find=0;
                    if(typeof liJ.childNodes != "undefined"){
                        liJ.childNodes.forEach(function(bloc){
                            if(bloc.innerText.trim() == elem){
                                find = 1;
                            }
                        });
                    }

                    if(find==0){
                        var liNew = document.createElement("li");
                        liNew.innerText = elem;
                        liJ.appendChild(liNew);
                    }
                });
            }
        }});
}


var timerRefresh = setInterval(function(){

    var idP= $("#gameName").text();
    if(typeof idP != "undefined" && idP != null && idP != ""){
        checkGame();
    }

}, 500);

function getListe(){

    var index = $("#mode").prop('selectedIndex');
    $("#listePartie").empty();
    let games = [];

    $.ajax({
        method: "POST",
        url: "../ajax_php/ajax_checkGame.php",
        success: function(filesList){
            games = JSON.parse(filesList);

            if(index==1){

                $("#listePartie").append("<br/><br/><p>Parties existantes :</p>");
                games.forEach(function(elem){
                    var texts = elem.split("_");
                    var text = texts[texts.length-1];
                    $("#listePartie").append("<p>"+text+"</p>");
                });

            }else if(index==2){

                $("#listePartie").append("<br/><br/><p>Parties existantes :</p>");
                games.forEach(function(elem){
                    var texts = elem.split("_");
                    var type = texts[0];
                    var text = texts[texts.length-1];

                    if(type != "priv"){
                        $("#listePartie").append("<p>"+text+"</p>");
                    }
            });
        }
    }});
}