<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data for fetching assessment
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFetchFileAssessmentData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch file assessment records by PATIENT_ID
 *
 * @param mysqli $conn The database connection object
 * @param string $patientId The patient ID to fetch
 * @return array The assessment records details
 */
function fetchFileAssessmentByPatientId($conn, $patientId) {
    $query = "SELECT PATIENT_ID, URL FROM file_assessment_table WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $patientId);
    $stmt->execute();
    $result = $stmt->get_result();

    $assessments = "";
    while ($row = $result->fetch_assoc()) {
        $assessments = $row;
    }

    $stmt->close();
    return $assessments;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFetchFileAssessmentData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch the file assessment records
$assessments = fetchFileAssessmentByPatientId($conn, $data->PATIENT_ID);
header("Access-Control-Allow-Origin: *");
// Return the assessment details as a JSON response
if (!empty($assessments)) {
    http_response_code(200);
    echo json_encode($assessments);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No assessments found for the provided Patient ID."));
}

$conn->close();
?>
