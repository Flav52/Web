<?php

//Recuperation du POST
$nomL = $_POST["nomLobby"];     //Nom du lobby
$idJoueur = $_POST["idJ"];
$indPlace = 2;

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

    if(!isset($dtArray["keke"])){
        $dtArray["launch"] = "go";
        $arrayJ = $dtArray["Joueurs"];
        shuffle($arrayJ);
        $nbP = sizeof($dtArray["Joueurs"]);

        $sep = floor($nbP/2)+1;
        $keke = array();
        $badger = array();

        for($i=0; $i<$nbP; $i++){
            if($sep>$i){
                array_push($keke, $arrayJ[$i]);
            }else{
                array_push($badger, $arrayJ[$i]);
            }
        }

        $dtArray["keke"] = $keke;
        $dtArray["badger"] = $badger;
    }

    for($i=0; $i<sizeof($dtArray["keke"]); $i++){
        if($dtArray["keke"][$i] == $idJoueur){
            $indPlace = $i;
        }
    }

    for($i=0; $i<sizeof($dtArray["badger"]); $i++){
        if($dtArray["badger"][$i] == $idJoueur){
            $indPlace = $i;
        }
    }

    $jData = json_encode($dtArray);

    file_put_contents($fn, $jData);

    $role = "badger";
    if(in_array($idJoueur, $dtArray["keke"])){
        $role = "keke";
    }

    echo json_encode(array($role, $indPlace));
}