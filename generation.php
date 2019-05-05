<?php
 $Map = array(array());
 $MapSize = 31;
 $Proba = array();

  function fill($nb,$id,$offset){ //pour générer les probas
    for($i = $offset ; $i < $offset+$nb ; $i++){
      $Proba[i] = $id;
    }
  }

  fill(50,1,0); //Murs
  fill(3,3,51); // KEKE
  fill(2,4,55); // Blaireaux
  fill(2,5,60); // potInco
  fill(2,6,63); // potView
  fill(1,7,66); // Bottes
  fill(5,8,68); // Brasero
  fill(1,9,74); // Cape
  fill(1,10,76); //shield
  fill(5,11,78); //flaque

   function newObj($nbr,$x){
     $cpt = 0;

     for($i=1 ; $i<31 ; $i++){
        for($j=1 ; $j<31 ; $j++){

          if($cpt == $nbr){
            $Map[i][j] = x;
            return;
          }

          if($Map[i][j]==0){
            $cpt++;
          }

        }
     }

   }

   function getNb(){
     $cpt = 0;

     for($i = 1 ; $i < 31 ; $i++){
       for($j = 1 ; $j < 31 ; $j++){
         if($Map[i][j] == 0){
           $cpt++;
         }
       }
     }
     return $cpt;
   }

   //remplissage de la map
   foreach($Proba as &$value){
     newObj(rand(0,getNb),$value);
   }


?>
