<?php

//Recuperation du POST
$nomL = $_POST["namePartie"];     //Nom du lobby
$nomP = $_SESSION['login'];      //Id du joueur créant le lobby

$indiceJoueur = "";

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

    $joueur = $nomP;
    array_push($dtArray["Joueurs"], $joueur);


    $jData = json_encode($dtArray);

    file_put_contents($fn, $jData);
}