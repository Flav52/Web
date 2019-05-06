<?php


//Données reçue de l'appel
$idP = $_POST["idP"];

//Formation du nom du fichier
$fileName = "../json_parties/game".$idP.".json";

if(!file_exists($fileName)){
    $fp = fopen($fileName, "w");
    $data = array();
    $data["Joueurs"] = array();

    $MapSize = 31;
    $Map = array_fill(0, $MapSize, array_fill(0, $MapSize, 0));
    $Proba = array();

    function fill($nb,$id,$offset){ //pour générer les probas
        $base = 0;
        $tabTemp = array();

        $scale = $offset+$nb;
        for($i = $offset ; $i < $scale ; $i++){
            $tabTemp[$i] = $id;
        }
        return $tabTemp;
    }

    $Proba += fill(70,1,0); //Murs
    $Proba += fill(10,3,71); // KEKE
    $Proba += fill(9,4,82); // Blaireaux
    $Proba += fill(2,5,92); // potInco
    $Proba += fill(2,6,95); // potView
    $Proba += fill(1,7,98); // Bottes
    $Proba += fill(5,8,100); // Brasero
    $Proba += fill(1,9,106); // Cape
    $Proba += fill(2,10,108); //shield
    $Proba += fill(5,11,114); //flaque


    function newObj($nbr,$x,$carte){
        $cpt = 0;
        for($i=1 ; $i<31-1 ; $i++){
            for($j=1 ; $j<31-1 ; $j++){
                if($cpt == $nbr){
                    $carte[$i][$j] = $x;
                    return $carte;
                }
                if($carte[$i][$j]==0){
                    $cpt++;
                }
            }
        }
        return $carte;
    }

    function getNb($carte, $MapSize){
        $cpt = 0;

        for($i = 1 ; $i < $MapSize ; $i++){
            for($j = 1 ; $j < $MapSize ; $j++){
                if($carte[$i][$j] == 0){
                    $cpt++;
                }
            }
        }
        return $cpt;
    }

//remplissage de la map
    foreach($Proba as $value){
        $valueM = getNb($Map, $MapSize);
        $random = rand(0,$valueM);
        $Map = newObj($random,$value,$Map);
    }

    $data["Carte"] = array();
    array_push($data["Carte"], $Map);
    $jData = json_encode($data);

    fwrite($fp, $jData);
    fclose($fp);
    chmod($fileName, 0766);
}


