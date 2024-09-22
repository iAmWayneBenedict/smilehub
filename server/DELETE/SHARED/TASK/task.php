<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

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
        $errors['ID'] = "Task ID is required.";
    }

    return $errors;
}

/**
 * Function to delete a task
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the task ID
 * @return bool True if the deletion is successful, false otherwise
 */
function deleteTask($conn, $data) {
    // Check if the task exists
    $queryCheckTask = "SELECT * FROM task_table WHERE ID = ?";
    $stmtCheckTask = $conn->prepare($queryCheckTask);
    $stmtCheckTask->bind_param('i', $data->ID);
    $stmtCheckTask->execute();
    $resultCheckTask = $stmtCheckTask->get_result();

    if ($resultCheckTask->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("message" => "Task not found."));
        exit;
    }

    // Delete the task
    $query = "DELETE FROM task_table WHERE ID = ?";
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

// Attempt to delete the task
if (deleteTask($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Task deleted successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete the task."));
}

$conn->close();
?>