<?php 
//si le bouton est pressé
if (isset($_POST['valider']) && $_POST['valider'] == 'Valider') {
  // Vérification de la validité des informations
  if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['mdp']) && !empty($_POST['mdp'])) && (isset($_POST['mail']) && !empty($_POST['mail']))) {

      // Insertion
          $servername = "127.0.0.1";
          $username = "root";
          $password = "";
          $dbname = "projet";


      $nameP = $_POST['login'];
      $mail = $_POST['mail'];
      $pswd = $_POST['mdp'];

      // Create connection
      $conn = mysqli_connect($servername, $username, $password, $dbname);
      if (!$conn) {
        echo "Erreur : Impossible de se connecter à MySQL." . PHP_EOL;
        echo "Errno de débogage : " . mysqli_connect_errno() . PHP_EOL;
        echo "Erreur de débogage : " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
      // Check connection
      if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
      }

      $pswdH = password_hash($pswd, PASSWORD_BCRYPT,['salt'=>'BnjrHllNhShJtpvtfdcsrg' ]);
      $sql = "INSERT INTO players (nom, mail, password_hash) VALUES ('$nameP', '$mail', '$pswdH')";

      if (mysqli_query($conn, $sql)) {
          $erreur = "Successfully registered";
          mysqli_close($conn);
          session_start();
          $_SESSION['login'] = $_POST['login'];
          header('Location: lobby.php');
      } else {
        $erreur =  "Error: This player already exists or is banned";
        mysqli_close($conn);
      }
  }
	else {
	$erreur = 'Au moins un des champs est vide.';
	}
}

function getThem(){
  return trim(file_get_contents("selected_theme.txt"));
}

function setTheme($theme){
  file_put_contents("selected_theme.txt", $theme);
}

if(isset($_POST["themeSelect"])){
  setTheme($_POST["themeSelect"]);
}

?>


<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Inscription</title>
  <link id="themeStylesheet" rel="stylesheet" href="../css/<?= getThem() ?>.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet">
</head>
  <body>
    <h1 class="titre"> Inscription: </h1>
	<form action="./inscription.php" class="formTheme" method="post">
      		<select id="select"   name="themeSelect">
        		<option value="index"  <?= getThem() === "index" ? "selected" : "" ?> >basique</option>
        		<option value="sombre"  <?= getThem() === "sombre" ? "selected" : "" ?> >sombre</option>
        		<option value="vert"  <?= getThem() === "vert" ? "selected" : "" ?> >vert</option>
      		</select>
      		<input type='submit' value='Save Theme'>
    	</form>
        <form class="newCompte" name="compte" method="post">
            Mail : <input class="zoneTexte" type="text" name="mail"/><br/>
            Login : <input class="zoneTexte" type="text" name="login"/><br/>
            Mot de passe: <input class="zoneTexte" type="password" name="mdp"/> <br/>
            <input class="bouton" type="submit" name="valider" value="Valider"/>
        </form>
        <br/>
        <?php if (isset($erreur))echo $erreur, '<br/><br/>'; ?>
    <a id="lien2" href="index.php" >
        Retour au menu
    </a>
	<script src="../js/theme.js"></script>
  </body>
</html>
