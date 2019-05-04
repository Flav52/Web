<?php

//Recuperation du POST
$nomL = $_POST["nomLobby"];     //Nom du lobby

//Formation du nom du fichier
$fileName = "../json_lobby/lobby_".$idP.".json";

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fileName)){
    $jsonData = file_get_contents($fileName);
    echo $jsonData;
}



