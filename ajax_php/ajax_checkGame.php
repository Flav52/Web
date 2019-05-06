<?php

$dossier = "../json_lobby/";
$matchFile = array();

$dir = opendir($dossier);
while ($dir && ($file = readdir($dir)) !== false) {
    list($filename, $extension) = explode(".", $file);
    if($file !== '.' && $file !== '..' && $extension == 'json' )
    {
        array_push($matchFile, $filename);
    }
}

echo json_encode($matchFile);