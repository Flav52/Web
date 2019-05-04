<?php
session_start();
if (!isset($_SESSION['login'])) {
	header ('Location: index.php');
	exit();
}

//récup les différents tableaux
$tabJoueur = array();
$tabSpec = array();
$tabPartie = array();
$tabPartieSpec = array();


?>

<html>
<head>
  <meta charset="utf-8">
  <title>Lobby</title>
  <link rel="stylesheet" href="../css/index.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet">
</head>
<body>
	<div class="entete"> <?php echo $_SESSION['login']; ?> <br /><?php if(isset($_SESSION['admin'])){ echo "<a id=\"gestion\" href=\"admin.php\">Gérer les joueurs</a><br/>"; } ?> <a id="deco" href="deconnexion.php">Déconnexion</a></div>
  <h1 class="titre"> Lobby: </h1>
  <form class="modeJeu" name="formulaireMode" method="post">
    <select id="mode" name="Mode"> 
      <option value="create">Créer une partie</option>
      <option value="join">Rejoindre une partie</option>
      <option value="spect">Regarder une partie</option>
    </select>
    <br/>
    Nom de la partie: <input class="zoneTexte" type="text" name="namePartie"/><br/>
    <input type="checkbox" id="type" name="type"checked>
    <label for="type">Privé?</label>
    <input class="bouton" type="submit" name="lancer" value="Valider"/>
    <br/>


    <?php 
      if (isset($_POST['lancer']) && $_POST['lancer'] == 'Valider') {
        if ((isset($_POST['namePartie']) && !empty($_POST['namePartie']))) {
          $a = $_POST['namePartie'];

          //Création de game
          if($_POST['Mode'] == "create"){
            
              print("<h3> $a </h3>");
              print("<ul>");
              for ($i = 0; $i < count($tabJoueur); $i++){
                echo "<li>"; echo $tabJoueur[$i]; echo "</li>";
              }  
              print("<ul>");

          }

          //Rejoindre une game
          if($_POST['Mode'] == "join"){
            $cpt = 0;
            for($j = 0; $j < count($tabPartie) ; $j++){
              if($a == $tabPartie[$j]){
                $cpt = $cpt + 1;
                print("<h3> $a </h3>");
                print("<ul>");
                for ($i = 0; $i < count($tabJoueur); $i++){
                  echo "<li>"; echo $tabJoueur[$i]; echo "</li>";
                }  
                print("<ul>");
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
                print("<h3> $a </h3>");
                print("<ul>");
                for ($i = 0; $i < count($tabSpec); $i++){
                  echo "<li>"; echo $tabSpec[$i]; echo "</li>";
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
</form>
  

</body>
</html>