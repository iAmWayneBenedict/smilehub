<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to get all dentist details
 *
 * @param mysqli $conn The database connection object
 * @return array An array of dentist with their full names and IDs
 */
function dentists($conn) {
    // Query to select all dentist details
    $query = "SELECT ID, FULLNAME, EMAIL, BIRTHDAY, GENDER ,ROLE, DATETIME, STATUS FROM employee_table";
    $result = $conn->query($query);
    
    $dentists = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $dentists[] = $row;
        }
    }

    return $dentists;
}

// Get the list of all dentists
$dentists = dentists($conn);

// Return the list as a JSON response
if (!empty($dentists)) {
    http_response_code(200);
    echo json_encode($dentists);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No dentists found."));
}

$conn->close();
?>