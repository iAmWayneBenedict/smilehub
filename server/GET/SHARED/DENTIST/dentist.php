<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateDentistIdData($data) {
    $errors = [];

    // Validate dentist ID
    if (empty($data->ID)) {
        $errors['ID'] = "Dentist ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch dentist details by ID
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the dentist ID
 * @return array|null The dentist's details or null if not found
 */
function fetchDentistById($conn, $data) {
    // Fetch dentist details for the given ID
    $query = "SELECT ID, FULLNAME, EMAIL, BIRTHDAY, GENDER, ROLE FROM employee_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->ID);
    $stmt->execute();
    $result = $stmt->get_result();

    $dentist = null;
    if ($result->num_rows > 0) {
        $dentist = $result->fetch_assoc();
    }

    $stmt->close();
    return $dentist;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateDentistIdData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch dentist details by ID
$dentist = fetchDentistById($conn, $data);

// Return the dentist details as a JSON response
if (!empty($dentist)) {
    http_response_code(200);
    echo json_encode($dentist);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Dentist not found."));
}

$conn->close();
?>
