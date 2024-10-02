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
 * Function to insert an assessment record
 *
 * @param mysqli $conn The database connection object
 * @param object $data The assessment data to insert
 * @return bool True if insert was successful, otherwise false
 */
function insertAssessment($conn, $data) {
    $query = "INSERT INTO file_assessment_table (PATIENT_ID, URL) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $data->PATIENT_ID, $data->URL); // Use 's' for string parameter
    
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

// Insert the assessment record
if (insertAssessment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Assessment record added successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to add assessment record."));
}

$conn->close();
?>