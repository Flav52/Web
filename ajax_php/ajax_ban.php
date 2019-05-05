<?php

    $id = $_POST["id"];
    $mode = $_POST["mode"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "projet";

    $conn = mysqli_connect ($servername, $username, $password, $dbname);

    if($mode==1){
        $sql = "INSERT INTO Bans VALUES ('$id')";
        mysqli_query($conn, $sql);
    }else{
        $sql = "DELETE FROM Bans WHERE id='$id'";
        mysqli_query($conn, $sql);
    }