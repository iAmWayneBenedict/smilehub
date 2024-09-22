<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateTaskData($data) {
    $errors = [];

    // Validate task id
    if (empty($data->ID)) {
        $errors['ID'] = "Task ID is required.";
    }
    
    // Validate title
    if (empty($data->TITLE)) {
        $errors['TITLE'] = "Title is required.";
    }

    // Validate description
    if (empty($data->DESCRIPTION)) {
        $errors['DESCRIPTION'] = "Description is required.";
    }

    // Validate status
    if (empty($data->STATUS)) {
        $errors['STATUS'] = "Status is required.";
    } elseif (!in_array($data->STATUS, ['Pending', 'On-going', 'Completed', 'On Hold', 'Cancelled', 'Urgent', 'Overdue'])) {
        $errors['STATUS'] = "Invalid status value.";
    }

    return $errors;
}

/**
 * Function to check if a task exists
 *
 * @param mysqli $conn The database connection object
 * @param int $taskId The ID of the task to check
 * @return bool True if the task exists, false otherwise
 */
function taskExists($conn, $taskId) {
    $query = "SELECT COUNT(*) FROM task_table WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $taskId);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    return $count > 0;
}

/**
 * Function to update a task in the task_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing task details
 * @return bool True if the update is successful, false otherwise
 */
function updateTask($conn, $data, $taskId) {
    $query = "UPDATE task_table SET 
        TITLE = ?, 
        DESCRIPTION = ?, 
        STATUS = ?, 
        DATETIME = NOW() 
    WHERE id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssi',
        $data->TITLE,
        $data->DESCRIPTION,
        $data->STATUS,
        $taskId
    );

    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateTaskData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Get the task ID from the request body
$taskId = $data->ID; // Ensure your JSON body includes "ID"

// Check if the task exists
if (!taskExists($conn, $taskId)) {
    http_response_code(404);
    echo json_encode(array("message" => "Task not found."));
    exit;
}

// Attempt to update the task
if (updateTask($conn, $data, $taskId)) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Task updated successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update task."));
}

$conn->close();
?>