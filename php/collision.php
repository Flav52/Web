<?php

$Map;
$Joueurs;
$Objets;

//TODO: Ajouter la data 'etat' 'alive' et 'visible' 'invincible' 'avatar' 'vision' 'vitesse' au JSON des joueurs

//Collisions entre joueurs
for($i = 0 ; $i < sizeof($Joueurs) ; $i++){
    $current=$Joueurs[i];
    for($j = 0 ; $j < sizeof($Joueurs) ; $j++){
        $current2=$Joueurs[j];
        if($current!=$current2){
            if($current.position==$current2.position){
                mange($current,$current2);
            }
        }
    }   
}

//Collisions entre joueurs et objets
for($i = 0 ; $i < sizeof($Joueurs) ; $i++){
    $current=$Joueurs[i];
    $pos=$Map[$current.position.x][$current.position.z];
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
}

function reset($j){
    $j.avatar=$j.etat;
    $j.visible=true;
    $j.invincible=false;
    $j.vision=false;
    $j.vitesse=1;
}

function getObj($x,$z){
    for($j = 0 ; $j < sizeof($Objets) ; $j++){
        if($Objets[j].position.x==$x && $Objets.position.z==$z)
        return $Objets[j];
    }
}



function mange($a,$b){
if($a.etat=='keke' && $b.etat='badger')
    kill($a);
else if($b.etat=='keke' && $a.etat='badger')
    kill($b);
else if($b.etat=='badger' && $a.etat='badger'){
    kill($a);
    kill($b);
}

function kill($x){
    if(!$x.invincible)
        for($i=0;i<sizeof($Joueurs);$i++){
            if($Joueurs[$i].ident==$x.ident){
                $Joueurs[$i].alive=false;
            }
        }
}

?>