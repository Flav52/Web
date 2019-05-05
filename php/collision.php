<?php

$Map;
$Joueurs;

//TODO: Ajouter la data 'etat' 'alive' et 'visible' 'invincible' 'avatar' au JSON des joueurs

//Collisions entre joueurs
for($i = $offset ; $i < sizeof($Joueurs) ; $i++){
    $current=$Joueurs[i];
    for($j = $offset ; $j < sizeof($Joueurs) ; $j++){
        $current2=$Joueurs[j];
        if($current!=$current2){
            if($current.position==$current2.position){
                mange($current,$current2);
            }
        }
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