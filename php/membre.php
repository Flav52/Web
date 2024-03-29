<?php
session_start();
if (!isset($_SESSION['login'])) {
	header ('Location: index.php');
	exit();
}

function getThem(){
    return trim(file_get_contents("selected_theme.txt"));
  }
?>

<html>
<head>
  <meta charset="utf-8">
  <title>Partie</title>
  <link  id="themeStylesheet" rel="stylesheet" href="../css/<?= getThem() ?>.css">
  <link href="https://fonts.googleapis.com/css?family=Londrina+Solid:300" rel="stylesheet">
</head>
<body>
	<div class="entete"> <?php echo $_SESSION['login']; ?><br/> <span id="chrono"></span> <span id="team"></span> <br /> <a id="deco" href="deconnexion.php">Déconnexion</a></div>
    <input id="idUser" type="hidden" value="<?php echo $_SESSION['login']; ?>">
    <input id="idPartie" type="hidden" value="<?php if(isset($_SESSION['idPartie'])){echo($_SESSION['idPartie']); }?>">

	<div id='container'></div>
    <script src='../js/three.js'></script>


    <div id="blocker">
        <div id="instructions">
            
        </div>
    </div>

    <script src="../js/jquery.js"></script>
    <script src="../js/stats.min.js"></script>

    <script src="../js/DDSLoader.js"></script>
    <script src="../js/MTLLoader.js"></script>
    <script src="../js/OBJLoader.js"></script>
    <script src="../js/Fire.js"></script>

    <script src="../js/Pedestal.js"></script>
    <script src="../js/Plateau.js"></script>
    <script src="../js/Joueur.js"></script>
    <script src="../js/main.js"></script>

</body>
</html>