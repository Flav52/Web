<?php

//Recuperation du POST
$nomL = $_POST["nomLobby"];     //Nom du lobby

//Formation du nom du fichier
$fileName = "../json_lobby/lobby_".$nomL.".json";
if(!file_exists($fileName)){
    $fileName = "../json_lobby/priv_lobby_".$nomL.".json";
}

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fileName)){
    $jsonData = file_get_contents($fileName);

    $jData = array();
    $jData = json_decode($jsonData, true);

    if(isset($jData["launch"])){
        echo -1;
    }else{
        echo $jsonData;
    }
}



