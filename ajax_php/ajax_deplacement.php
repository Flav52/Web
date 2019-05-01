<?php

//Données reçue de l'appel
$id = $_POST["id"];
$idP = $_POST["idP"];
$posX = $_POST["posX"];
$posZ = $_POST["posZ"];
$rotY = $_POST["rotY"];

//Formation du nom du fichier
$fileName = "../json_parties/game".$idP.".json";

if(file_exists($fileName)) {

    $jsonData = file_get_contents($fileName);
    $data = json_decode($jsonData, true);

    $tabJoueur = $data["Joueurs"];

    foreach($tabJoueur as $key => $joueur){
        if($joueur["id"] == $id){
            $data["Joueurs"][$key]["positionX"] = $posX;
            $data["Joueurs"][$key]["positionZ"] = $posZ;
            $data["Joueurs"][$key]["rotationY"] = $rotY;
        }
    }

    $jData = json_encode($data);

    echo $jData;

    file_put_contents($fileName, $jData);
}