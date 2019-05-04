<?php

//Recuperation du POST
$nomL = $_POST["nomLobby"];     //Nom du lobby
$mode = $_POST["mode"];         //Definit insertion/suppression  --> 1 - insertion / 0 - suppression
$idP = $_POST["idJoueur"];      //Id du joueur créant le lobby
$nomP = $_POST["nomJoueur"];      //Id du joueur créant le lobby

$indiceJoueur = "";

//Formation du nom du fichier
$fileName = "../json_lobby/lobby_".$idP.".json";

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fileName)){
    $jsonData = file_get_contents($fileName);

    if($mode==1){
        $joueur = array("id" => $idP, "nom" => $nomP);
        array_push($jsonData["Joueurs"] $joueur);
    }else{
        foreach($jsonData["Joueurs"] as $key => $val){
            if($val["id"] == $idP){
                $indiceJoueur = $key;
            }
        }

        unset($jsonData["Joueurs"][$indiceJoueur]);
    }

    $jData = json_encode($data);

    echo $jData;

    file_put_contents($fileName, $jData);
}