<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the edit request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Note ID is required.";
    }

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
 * Function to edit a progress note
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the progress note details
 * @return bool True if the update is successful, false otherwise
 */
function editProgressNote($conn, $data) {
    // Check if the progress note exists
    $queryCheckNote = "SELECT * FROM progress_table WHERE ID = ?";
    $stmtCheckNote = $conn->prepare($queryCheckNote);
    $stmtCheckNote->bind_param('i', $data->ID);
    $stmtCheckNote->execute();
    $resultCheckNote = $stmtCheckNote->get_result();

    if ($resultCheckNote->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("message" => "Progress note not found."));
        exit;
    }

    // Update the progress note
    $query = "UPDATE progress_table SET PATIENT_ID = ?, NOTES = ?, DATE = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('issi', $data->PATIENT_ID, $data->NOTES, $data->DATE, $data->ID);
    $result = $stmt->execute();
    $stmt->close();
    
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the edit request data
$validationErrors = validateRequestData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to edit the progress note
if (editProgressNote($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Progress note updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update progress note."));
}

$conn->close();
?>