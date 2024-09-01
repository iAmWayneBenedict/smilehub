<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to get all patients' full names and IDs
 *
 * @param mysqli $conn The database connection object
 * @return array An array of patients with their full names and IDs
 */
function patients($conn) {
    // Query to select all patients' ID and full names
    $query = "SELECT ID, CONCAT(FIRSTNAME, ' ', LASTNAME) AS FULLNAME, ROLE FROM patient_table";
    $result = $conn->query($query);
    
    $patients = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
    }

    return $patients;
}

// Get the list of all patients
$patients = patients($conn);

// Return the list as a JSON response
if (!empty($patients)) {
    http_response_code(200);
    echo json_encode($patients);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No patients found."));
}

$conn->close();
?>
