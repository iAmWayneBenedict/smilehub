<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateAssessmentData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate URL
    if (empty($data->URL)) {
        $errors['URL'] = "URL is required.";
    }
    return $errors;
}


/**
 * Function to update the assessment record
 *
 * @param mysqli $conn The database connection object
 * @param string $patientId The patient ID
 * @return bool True if the update was successful, otherwise false
 */
function updateAssessment($conn, $data) {
    $query = "UPDATE file_assessment_table SET URL = ? WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $data->URL, $data->PATIENT_ID);
    
    return $stmt->execute();
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateAssessmentData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Update the assessment record
if (updateAssessment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "File updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update file in the database."));
}

$conn->close();
?>