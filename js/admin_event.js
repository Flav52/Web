function bannir(){

    var IdJoueur = $("#banButton").val();

    $.ajax({
        method: "POST",
        url: "../ajax_php/ajax_ban.php",
        data: {id: IdJoueur, mode: 1},
        dataType: "html",
        success: function(){
            document.location.reload();
        }});
}

function debannir(){

    var IdJoueur = $("#unbanButton").val();

    $.ajax({
        method: "POST",
        url: "../ajax_php/ajax_ban.php",
        data: {id: IdJoueur, mode: 0},
        dataType: "html",
        success: function(){
            document.location.reload();
        }});
}