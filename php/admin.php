<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet";

$name = $_SESSION['login'];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT admin FROM players WHERE nom='$name'";

if (mysqli_num_rows(mysqli_query($conn, $sql)) == 1) {

    $sql = "SELECT id, nom FROM players";
    $res = mysqli_query($conn, $sql);

    ?>
    <table>
        <?php
        while($row = $res->fetch_assoc()){

        echo "<tr><td>" . $row['id'] . "</td>";
        echo "<td>" . $row['nom'] . "</td>";

        $idFetch = $row['id'];
        $sql2 = "SELECT id FROM bans WHERE id='$idFetch'";

        if (mysqli_num_rows(mysqli_query($conn, $sql2)) == 1) {
            echo '<td><button id="unbanButton" value="'.$idFetch.'" type="button" onclick="debannir()">Débannir</button></td>';
        } else {
            echo '<td><button id="banButton" value="'.$idFetch.'" type="button" onclick="bannir()">Bannir</button></td>';
        }

        ?> </tr> <?php

        }


        ?> </table> <?php
}
?>

<script src="../js/jquery.js"></script>
<script src="../js/admin_event.js"></script>