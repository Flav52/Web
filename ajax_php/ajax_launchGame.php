<?php

//Recuperation du POST
$nomL = $_POST["nomLobby"];     //Nom du lobby


//Formation du nom du fichier
$fn = "../json_lobby/lobby_".$nomL.".json";

if(!file_exists($fn)){
    $fn = "../json_lobby/priv_lobby_".$nomL.".json";
}

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fn)){
    $jsonArray = file_get_contents($fn);
    $dtArray = array();
    $dtArray = json_decode($jsonArray, true);

    $dtArray["launch"] = "go";

    $jData = json_encode($dtArray);

    file_put_contents($fn, $jData);

    echo $jData;
}