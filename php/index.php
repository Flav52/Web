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

        echo "Successfully signed in";
        $_SESSION['login'] = $_POST['login'];
        header('Location: lobby.php');


    }else{
      echo "You have been banned by an administrator";
    }
  } else {
    echo "Error: Wrong password or login";
  }
	}
	else {
	$erreur = 'Au moins un des champs est vide.';
  }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Log</title>
  <link rel="stylesheet" href="../css/index.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet"> 
</head>
  <body>
    <h1 class="titre"> KEKES vs BLAIREAUX </h1>
        <form class="login" name="connexion" method="post">
            Login : <input class="zoneTexte" type="text" name="login"/><br/>
            Mot de passe: <input class="zoneTexte" type="password" name="mdp"/> <br/>
            <input class="bouton" type="submit" name="valider" value="Connexion"/>
        </form>
        <br/>
        <?php
        if (isset($erreur))echo $erreur, '<br/><br/>'; 
        ?>
    <a href="inscription.php" >
        Créer un nouveau compte
    </a>
  </body>
</html>
