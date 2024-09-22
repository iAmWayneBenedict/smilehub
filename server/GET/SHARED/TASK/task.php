<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateTaskIdData($data) {
    $errors = [];

    // Validate task ID
    if (empty($data->ID)) {
        $errors['ID'] = "Task ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch task details by ID
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the task ID
 * @return array|null The task's details or null if not found
 */
function fetchTaskById($conn, $data) {
    // Fetch task details for the given ID
    $query = "SELECT * FROM task_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->ID);
    $stmt->execute();
    $result = $stmt->get_result();

    $task = null;
    if ($result->num_rows > 0) {
        $task = $result->fetch_assoc();
    }

    $stmt->close();
    return $task;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateTaskIdData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch task details by ID
$task = fetchTaskById($conn, $data);

// Return the task details as a JSON response
if (!empty($task)) {
    http_response_code(200);
    echo json_encode($task);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Task not found."));
}

$conn->close();
?>