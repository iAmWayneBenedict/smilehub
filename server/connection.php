<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: access, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Set response content type
header("Content-Type: application/json; charset=UTF-8");

// Prevent caching
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Set default timezone
date_default_timezone_set("Asia/Manila");

// Database credentials
$SERVERNAME = "localhost";
$USERNAME = "root";
$PASSWORD = "";
$DBNAME = "smilehub_db";

// For Deployment
// $SERVERNAME = "";
// $USERNAME = "";
// $PASSWORD = ";
// $DBNAME = "";

// Create connection
$conn = new mysqli($SERVERNAME, $USERNAME, $PASSWORD, $DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
