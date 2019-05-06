<?php


//Données reçue de l'appel
$id = $_POST["id"];
$idP = $_POST["idP"];
$team = $_POST["equipe"];

//Formation du nom du fichier
$fileName = "../json_parties/game" . $idP . ".json";

if (file_exists($fileName)) {

    $jsonData = file_get_contents($fileName);
    $data = json_decode($jsonData, true);

    $tabJoueur = $data["Joueurs"];

    foreach ($tabJoueur as $key => $joueur) {
        if ($joueur["id"] == $id) {
            $data["Joueurs"][$key]["etat"] = $team;

            if(!($joueur["avatar"]=="neutral")){
                $data["Joueurs"][$key]["avatar"] = $team;
            }
        }
    }

    $jData = json_encode($data);

    file_put_contents($fileName, $jData);
}