<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFetchNotesData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch all progress notes for a specific patient
 *
 * @param mysqli $conn The database connection object
 * @param int $patientId The ID of the patient
 * @return array An array of progress notes for the specified patient
 */
function fetchProgressNotesByPatientId($conn, $patientId) {
    $query = "SELECT * FROM progress_table WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $patientId);
    $stmt->execute();
    $result = $stmt->get_result();

    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }

    $stmt->close();
    return $notes;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFetchNotesData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch the progress notes for the specified patient
$progressNotes = fetchProgressNotesByPatientId($conn, $data->PATIENT_ID);

// Return the notes as a JSON response
if (!empty($progressNotes)) {
    http_response_code(200);
    echo json_encode($progressNotes);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No progress notes found for this patient."));
}

$conn->close();
?>