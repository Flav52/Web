<?php

//Recuperation du POST
$id = $_POST["id"];
$idP = $_POST["idP"];

//Formation du nom du fichier
$fileName = "../json_parties/game".$idP.".json";

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fileName)){
    $jsonData = file_get_contents($fileName);
    echo $jsonData;
}



