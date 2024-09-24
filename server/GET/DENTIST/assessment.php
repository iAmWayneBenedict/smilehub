<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data for fetching assessment
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFetchAssessmentData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate TOOTH_NO
    if (empty($data->TOOTH_NO)) {
        $errors['TOOTH_NO'] = "Tooth number is required.";
    }

    return $errors;
}

/**
 * Function to fetch an assessment record by PATIENT_ID and TOOTH_NO
 *
 * @param mysqli $conn The database connection object
 * @param int $patientId The patient ID to fetch
 * @param int $toothNo The tooth number to fetch
 * @return array|null The assessment record details or null if not found
 */
function fetchAssessmentByPatientIdAndToothNo($conn, $patientId, $toothNo) {
    $query = "SELECT ID, PATIENT_ID, TOOTH_NO, COLOR, TEXTURE, GUM_HEALTH, PRESENCE_OF_DECAY, CAVITIES, SENSITIVITY, MOBILITY, PREVIOUS_TREATMENT, DATETIME FROM assessment_table WHERE PATIENT_ID = ? AND TOOTH_NO = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('is', $patientId, $toothNo);
    $stmt->execute();
    $result = $stmt->get_result();

    $assessment = null;
    if ($result->num_rows > 0) {
        $assessment = $result->fetch_assoc();
    }

    $stmt->close();
    return $assessment;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFetchAssessmentData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch the assessment record
$assessment = fetchAssessmentByPatientIdAndToothNo($conn, $data->PATIENT_ID, $data->TOOTH_NO);

// Return the assessment details as a JSON response
if (!empty($assessment)) {
    http_response_code(200);
    echo json_encode($assessment);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No assessment found with the provided Patient ID and Tooth Number."));
}

$conn->close();
?>