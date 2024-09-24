<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the delete request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Progress note ID is required.";
    }

    return $errors;
}

/**
 * Function to delete a progress note
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the progress note ID
 * @return bool True if the deletion is successful, false otherwise
 */
function deleteProgressNote($conn, $data) {
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

    // Delete the progress note
    $query = "DELETE FROM progress_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->ID);
    $result = $stmt->execute();
    $stmt->close();
    
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the delete request data
$validationErrors = validateRequestData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to delete the progress note
if (deleteProgressNote($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Progress note deleted successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete the progress note."));
}

$conn->close();
?>