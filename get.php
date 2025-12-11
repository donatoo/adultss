<?php
header("Content-Type: text/plain");

// Only allow ID parameter
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo "Missing ID";
    exit;
}

$id = trim($_GET['id']);
$file = "links.txt";

if (!file_exists($file)) {
    http_response_code(500);
    echo "Link file missing";
    exit;
}

$lines = file($file, FILE_IGNORE_NEW_LINES);
foreach ($lines as $line) {
    if (strpos($line, $id . "=") === 0) {
        echo explode("=", $line, 2)[1];
        exit;
    }
}

// Nothing found
http_response_code(404);
echo "Not found";
