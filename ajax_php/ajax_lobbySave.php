<?php

    $nomL = $_POST["nomLobby"];     //Nom du lobby
    $idP = $_POST["idJoueur"];      //Id du joueur créant le lobby
    $nomP = $_POST["nomJoueur"];      //Id du joueur créant le lobby

    //Formation du nom du fichier
    $fileName = "../json_lobby/lobby_".$nomL.".json";

    $fp = fopen($fileName, "w");

    $data = array();
    $data["Joueurs"] = array();

    $joueur = array("id" => $idP, "nom" => $nomP);

    array_push($data["Joueurs"], $joueur);

    $jData = json_encode($data);

    fwrite($fp, $jData);
    fclose($fp);
    chmod($fileName, 0766);