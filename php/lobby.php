<?php
session_start();
if (!isset($_SESSION['login'])) {
	header ('Location: index.php');
	exit();
}

//récup les différents tableaux
$tabPartie = array();
$tabPartieSpec = array();

$dossier = "../json_lobby/";
$matchFile = array();

$dir = opendir($dossier);
while ($dir && ($file = readdir($dir)) !== false) {
    list($filename, $extension) = explode(".", $file);
    if($file !== '.' && $file !== '..' && $extension == 'json' )
    {
        $texts = explode("_", $filename);

        if($texts[0] != "priv"){
            array_push($tabPartieSpec, $texts[1]);
            array_push($tabPartie, $texts[1]);
        }else{
            array_push($tabPartie, $texts[2]);
        }
    }
}


$tabJoueur = array();

?>

<html>
<head>
  <meta charset="utf-8">
  <title>Lobby</title>
  <link rel="stylesheet" href="../css/index.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet">
  <script src="../js/lobby_event.js"></script>
  <script src="../js/jquery.js"></script>
</head>
<body>
	<div class="entete"> <?php echo $_SESSION['login']; ?> <br /><?php if(isset($_SESSION['admin'])){ echo "<a id=\"gestion\" href=\"admin.php\">Gérer les joueurs</a><br/>"; } ?> <a id="deco" href="deconnexion.php">Déconnexion</a></div>
  <h1 class="titre"> Lobby: </h1>
  <form class="modeJeu" name="formulaireMode" method="post">
    <select id="mode" name="Mode" onchange="getListe()">
      <option value="create">Créer une partie</option>
      <option value="join">Rejoindre une partie</option>
      <option value="spect">Regarder une partie</option>
    </select>
    <br/>
    Nom de la partie: <input class="zoneTexte" type="text" name="namePartie"/><br/>
    <input type="checkbox" id="type" name="type" checked>
    <label for="type">Privé?</label>
    <input class="bouton" type="submit" name="lancer" value="Valider"/>
    <br/>
  </form>

    <?php
        if(isset($_POST["namePartie"])){

            $nomP = $_POST["namePartie"];
            $fileName = "../json_lobby/lobby_$nomP.json";
            $fileNamepriv = "../json_lobby/priv_lobby_$nomP.json";

            if(file_exists($fileName)){
                $jsonData = file_get_contents($fileName);

                $data = array();
                $data = json_decode($jsonData, true);
                $players = $data["Joueurs"];

                foreach($players as $key => $elem ){
                    array_push($tabJoueur, $elem);
                }
            }elseif(file_exists($fileNamepriv)){
                $jsonData = file_get_contents($fileNamepriv);

                $data = array();
                $data = json_decode($jsonData, true);
                $players = $data["Joueurs"];

                foreach($players as $key => $elem ){
                    array_push($tabJoueur, $elem);
                }
            }
        }

      if (isset($_POST['lancer']) && $_POST['lancer'] == 'Valider') {
        if ((isset($_POST['namePartie']) && !empty($_POST['namePartie']))) {
          $a = $_POST['namePartie'];

          //Création de game
          if($_POST['Mode'] == "create"){

              require_once('../ajax_php/ajax_lobbySave.php');

              print("<h3> $a </h3>");
              print("<textarea id='gameName' hidden>$a</textarea>");

              if(isset($_POST['type'])){ echo "Private"; }

              print("<ul class='players'>");
              for ($i = 0; $i < count($tabJoueur); $i++){
                echo "<li>"; echo $tabJoueur[$i]; echo "</li>";
              }
              print("<ul>");
              $_SESSION['idPartie'] = $a;
              ?>
              <form action="membre.php" method="post">
                  <input type="submit" value="Lancer la partie" />
              </form>
              <?php
          }

          //Rejoindre une game
          if($_POST['Mode'] == "join"){
            $cpt = 0;
            for($j = 0; $j < count($tabPartie) ; $j++){
              if($a == $tabPartie[$j]){
                $cpt = $cpt + 1;
                require_once("../ajax_php/ajax_lobbyUpdate.php");
                print("<h3> $a </h3>");
                print("<textarea id='gameName' hidden>$a</textarea>");
                print("<ul class='players'>");
                for ($i = 0; $i < count($tabJoueur); $i++){
                  echo "<li>"; echo $tabJoueur[$i]; echo "</li>";
                }  
                print("<ul>");
                $_SESSION['idPartie'] = $a;
              }
            }
            if($cpt == 0)$erreur = 'Cette partie n\'existe pas.';
          }

          //Spectate une game
          if($_POST['Mode'] == "spect"){
            $cpt = 0;
            for($k = 0; $k < count($tabPartieSpec) ; $k++){
              if($a == $tabPartieSpec[$k]){
                $cpt = $cpt + 1;
                print("<h3 id='gameName' value='$a'> $a </h3>");
                print("<ul class='players'>");
                for ($i = 0; $i < count($tabJoueur); $i++){
                  echo "<li>"; echo $tabJoueur[$i]; echo "</li>";
                }  
                print("<ul>");
              }             
            }
            if($cpt == 0)$erreur = 'Cette partie n\'existe pas ou est privé.';
          }
        }
        else {
          $erreur = 'Le nom de la partie est manquant.';
        }
      }
    ?>

    <?php
      if (isset($erreur))echo $erreur, '<br/><br/>'; 
    ?>

    <div id="listePartie"></div>
    <label id="retMsg"></label>

</body>
</html>