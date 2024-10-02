<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validatePatientIdData($data) {
    $errors = [];

    // Validate patient ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch patient details by PATIENT_ID
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the patient PATIENT_ID
 * @return array|null The patient's details or null if not found
 */
function fetchPatientById($conn, $data) {
    // Fetch patient details for the given PATIENT_ID
    $query = "SELECT * FROM form_table WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->PATIENT_ID);
    $stmt->execute();
    $result = $stmt->get_result();

    $patient = null;
    if ($result->num_rows > 0) {
        $patient = $result->fetch_assoc();
    }

    $stmt->close();
    return $patient;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validatePatientIdData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch patient details by PATIENT_ID
$patient = fetchPatientById($conn, $data);

// Return the patient details as a JSON response
if (!empty($patient)) {
    http_response_code(200);
    echo json_encode($patient);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Patient not found."));
}

$conn->close();
?>
