<?php
// on teste si le visiteur a soumis le formulaire de connexion
if (isset($_POST['valider']) && $_POST['valider'] == 'Connexion') {
	if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['mdp']) && !empty($_POST['mdp']))) {

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "projet";

  $conn = mysqli_connect ($servername, $username, $password, $dbname);
  
  $name = $_POST['login'];
  $pswd= $_POST['mdp'];


	// on teste si une entrée de la base contient ce couple login / pass
	// Check connection
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  $pswdH = password_hash($pswd, PASSWORD_BCRYPT,['salt'=>'BnjrHllNhShJtpvtfdcsrg' ]);
  $sql = "SELECT pass_hash FROM Players WHERE nom='$name' AND pass_hash='$pswdH'";

  if (mysqli_num_rows(mysqli_query($conn, $sql)) == 1) {
    $sqlB = "SELECT id FROM Bans WHERE nom='$name'";
    if(mysqli_num_rows(mysqli_query($conn, $sqlB)) == 0){
        session_start();

        $sql = "SELECT admin FROM Players WHERE nom='$name'";
        if (mysqli_num_rows(mysqli_query($conn, $sql)) == 1){
            $_SESSION['admin'] = "adm";
        }

        $erreur = "Successfully signed in";
        $_SESSION['login'] = $_POST['login'];
        header('Location: lobby.php');


    }else{
      $erreur = "You have been banned by an administrator";
    }
  } else {
    $erreur = "Error: Wrong password or login";
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
  <title>Connexion</title>
  <link  id="themeStylesheet" rel="stylesheet" href="../css/<?= getThem() ?>.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet"> 
</head>
  <body>
    <h1 class="titre"> KEKES vs BLAIREAUX </h1>
	<form action="./" method="post">
      		<select name='themeSelect' id="select">
        		<option value="index" <?= getThem() === "index" ? "selected" : "" ?> >basique</option>
        		<option value="sombre" <?= getThem() === "sombre" ? "selected" : "" ?> >sombre</option>
        		<option value="vert" <?= getThem() === "vert" ? "selected" : "" ?> >vert</option>
      		</select>
      		<input type='submit' value='Save Theme'>
    	</form>
        <form class="login" name="connexion" method="post">
            Login : <input class="zoneTexte" type="text" name="login"/><br/>
            Mot de passe: <input class="zoneTexte" type="password" name="mdp"/> <br/>
            <input class="bouton" type="submit" name="valider" value="Connexion"/>
        </form>
        <br/>
        <?php if (isset($erreur))echo $erreur, '<br/><br/>'; ?>
    <a id="lien" href="inscription.php" >
        Créer un nouveau compte
    </a>
	  <script src="../js/theme.js"></script>
  </body>
</html>
