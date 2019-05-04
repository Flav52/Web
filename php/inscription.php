<?php 
//si le bouton est pressé
if (isset($_POST['valider']) && $_POST['valider'] == 'Valider') {
  // Vérification de la validité des informations
  if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['mdp']) && !empty($_POST['mdp'])) && (isset($_POST['mail']) && !empty($_POST['mail']))) {

      // Insertion
          $servername = "localhost";
          $username = "root";
          $password = "";
          $dbname = "projet";

      $conn = mysqli_connect ($servername, $username, $password, $dbname);

      $nameP = $_POST['login'];
      $mail = $_POST['mail'];
      $pswd = $_POST['mdp'];

      // Create connection
      $conn = mysqli_connect($servername, $username, $password, $dbname);
      // Check connection
      if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
      }

      $pswdH = password_hash($pswd, PASSWORD_BCRYPT,['salt'=>'BnjrHllNhShJtpvtfdcsrg' ]);
      $sql = "INSERT INTO Players (nom, mail,pass_hash) VALUES ('$nameP', '$mail', '$pswdH')";

      if (mysqli_query($conn, $sql)) {
          echo "Successfully registered";
          mysqli_close($conn);
          session_start();
          $_SESSION['login'] = $_POST['login'];
          header('Location: lobby.php');
      } else {
        echo "Error: This player already exists or is banned";
        echo mysqli_error($conn);
        mysqli_close($conn);
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
  <title>Inscription</title>
  <link rel="stylesheet" href="../css/index.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet">
</head>
  <body>
    <h1 class="titre"> Inscription: </h1>
        <form class="newCompte" name="compte" method="post">
            Mail : <input class="zoneTexte" type="text" name="mail"/><br/>
            Login : <input class="zoneTexte" type="text" name="login"/><br/>
            Mot de passe: <input class="zoneTexte" type="password" name="mdp"/> <br/>
            <input class="bouton" type="submit" name="valider" value="Valider"/>
        </form>
        <br/>
        <?php
        if (isset($erreur))echo $erreur, '<br/><br/>'; 
        if (isset($query))echo 'Inscription acceptée', '<br/><br/>'; 
        ?>
   
    <a href="index.php" >
        Retour au menu
    </a>
  </body>
</html>
