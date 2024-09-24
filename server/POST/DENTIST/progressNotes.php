<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateProgressData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate NOTES
    if (empty($data->NOTES)) {
        $errors['NOTES'] = "Notes are required.";
    }

    // Validate DATE
    if (empty($data->DATE)) {
        $errors['DATE'] = "Date is required.";
    }

    return $errors;
}

/**
 * Function to add a progress record to the progress_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing progress details
 * @return bool True if the insert is successful, false otherwise
 */
function addProgress($conn, $data) {
    $query = "INSERT INTO progress_table (PATIENT_ID, NOTES, DATE) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('iss', $data->PATIENT_ID, $data->NOTES, $data->DATE);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateProgressData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to add the progress record
if (addProgress($conn, $data)) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Progress record added successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to add progress record."));
}

$conn->close();
?>