<?php

    $nomL = $_POST['namePartie'];     //Nom du lobby
    $nomP = $_SESSION['login'];      //Id du joueur créant le lobby

    //Formation du nom du fichier
    if(isset($_POST["type"])){
        $fileName = "../json_lobby/priv_lobby_".$nomL.".json";
    }else{
        $fileName = "../json_lobby/lobby_".$nomL.".json";
    }

    if(!file_exists($fileName)){
        $fp = fopen($fileName, "w");

        $data = array();
        $data["Joueurs"] = array();

        $joueur = $nomP;

        array_push($data["Joueurs"], $joueur);

        $jData = json_encode($data);

        fwrite($fp, $jData);
        fclose($fp);
        chmod($fileName, 0766);

        echo "";
    }else{
        echo "Nom deja existant";
    }
