<!DOCTYPE html>
<meta charset="utf-8" />
<html lang='en'>

<head>
    <link rel="stylesheet" href="css/stylesheet.css" />
    <script type="text/javascript" src="jquery.js"></script>
</head>

<body>

    <input id="idUser" type="hidden" value="<?php
        if(isset($_POST['idUser'])){
            echo $_POST['idUser'];
        }else{
            echo rand(0,150);
        }
    ?>">

    <div id='container'></div>
    <script src='js/three.js'></script>


    <div id="blocker">
        <div id="instructions">
            
        </div>
    </div>


    <script src="js/stats.min.js"></script>

    <script src="js/DDSLoader.js"></script>
    <script src="js/MTLLoader.js"></script>
    <script src="js/OBJLoader.js"></script>
    <script src="js/Fire.js"></script>

    <script src="js/Pedestal.js"></script>
    <script src="js/Objet.js"></script>
    <script src="js/Plateau.js"></script>
    <script src="js/Joueur.js"></script>
    <script src="js/main.js"></script>




</body>

</html>