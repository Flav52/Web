<?php

//Recuperation du POST
$id = $_POST["id"];
$idP = $_POST["idP"];

//Formation du nom du fichier
$fileName = "../json_parties/game".$idP.".json";

//On actualise que si le fichier existe pour éviter les bugs à la création
if(file_exists($fileName)){
    $jsonData = file_get_contents($fileName);
    $jData = json_decode($jsonData, true);

    $Map = $jData["Carte"];
    $Joueurs = $jData["Joueurs"];
    //$Objets;

    //TODO: Ajouter la data 'etat' 'alive' et 'visible' 'invincible' 'avatar' 'vision' 'vitesse' au JSON des joueurs

    function resetPersonnage($j){
        $j["avatar"]=$j["etat"];
        $j["visible"]=true;
        $j["invincible"]=false;
        $j["vision"]=false;
        $j["vitesse"]=1;
    }
    /*
        function getObj($x,$z){
            for($j = 0 ; $j < sizeof($Objets) ; $j++){
                if($Objets[j]["positionX"]==$x && $Objets["positionZ"]==$z)
                    return $Objets[j];
            }
        }
    */

    function kill($x, $Joueurs){
        if(!$x["invincible"]){
            for($i=0;$i<sizeof($Joueurs);$i++){
                if($Joueurs[$i]["id"]==$x["id"]){
                    $Joueurs[$i]["alive"]=false;
                }
            }
        }
        return $Joueurs;
    }

    function mange($a,$b, $Joueurs){
        if($a["etat"]=='keke' && $b["etat"]='badger')
            $Joueurs = kill($a, $Joueurs);
        else if($b["etat"]=='keke' && $a["etat"]='badger')
            $Joueurs = kill($b, $Joueurs);
        else if($b["etat"]=='badger' && $a["etat"]='badger'){
            $Joueurs = kill($a, $Joueurs);
            $Joueurs = kill($b, $Joueurs);
        }

        return $Joueurs;
    }

    //Collisions entre joueurs
    for($i = 0 ; $i < sizeof($Joueurs) ; $i++){
        $current=$Joueurs[$i];
        for($j = 0 ; $j < sizeof($Joueurs) ; $j++){
            $current2=$Joueurs[$j];
            if($current["id"]!=$current2["id"]){
                if($current["positionX"]==$current2["positionX"] && $current["positionZ"]==$current2["positionZ"]){
                    $Joueurs = mange($current,$current2, $Joueurs);
                }
            }
        }
    }
/*
    //Collisions entre joueurs et objets
    for($i = 0 ; $i < sizeof($Joueurs) ; $i++){
        $current=$Joueurs[i];
        $pos=$Map[$current["positionX"][current["positionZ"]];
        if($pos>=5 && $pos !=8 && $pos !=11){
            $obj=getObj($current.position.x,$current.position.z)
        if(!$obj.active)
            continue;
        reset($current);
        switch($pos){
            case 5: //Incognito
                $current.avatar='neutre';
                $obj.active=false;
                break;

            case 6: //Vision
                $current.vision=true;
                $obj.active=false;
                break;

            case 7: //Botte
                $current.vitesse=2;
                $obj.active=false;
                break;

            case 9:
                $current.invisible=true;
                $obj.active=false;
                break;

            case 10:
                $current.invincible=true;
                $obj.active=false;
                break;

            //TODO: Gérer les flaques
        }
    }
    }*/



    $jData["Joueurs"] = $Joueurs;
    $jsonData = json_encode($jData);

    file_put_contents($fileName, $jsonData);

    echo $jsonData;
}




