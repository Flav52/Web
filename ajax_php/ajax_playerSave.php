<?php

//Données reçue de l'appel
$id = $_POST["id"];
$idP = $_POST["idP"];
$posX = $_POST["posX"];
$posZ = $_POST["posZ"];
$rotY = $_POST["rotY"];
$etat = $_POST["etat"];
$alive = true;
$visible = true;
$invincible = false;
$avatar = $etat;
$vision = false;
$vitesse = 1;

//Formation du nom du fichier
$fileName = "../json_parties/game".$idP.".json";

$ex = false; //Existance du fichier

if(!file_exists($fileName)){
    $fp = fopen($fileName, "w");
    $data = array();
    $data["Joueurs"] = array();
    $ex = true;
}else{
    $jsonData = file_get_contents($fileName);
    $data = json_decode($jsonData, true);
}

$joueur = array(
    "id" => $id,
    "positionX" => $posX,
    "positionZ" => $posZ,
    "rotationY" => $rotY,
    "alive" => $alive,
    "visible" => $visible,
    "invincible" => $invincible,
    "avatar" => $avatar,
    "vision" => $vision,
    "vitesse" => $vitesse

);

array_push($data["Joueurs"], $joueur);
$jData = json_encode($data);

if($ex){
    fwrite($fp, $jData);
    fclose($fp);
    chmod($fileName, 0766);
}else{
    file_put_contents($fileName, $jData);
}