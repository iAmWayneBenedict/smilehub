<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateTaskData($data) {
    $errors = [];

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

    // Validate creator
    if (empty($data->CREATOR)) {
        $errors['CREATOR'] = "Creator is required.";
    }

    // Validate creator email
    if (empty($data->CREATOR_EMAIL)) {
        $errors['CREATOR_EMAIL'] = "Creator email is required.";
    }

    return $errors;
}

/**
 * Function to insert a new task into the task_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing task details
 * @return bool True if the insertion is successful, false otherwise
 */
function insertTask($conn, $data) {
    $query = "INSERT INTO task_table (
        TITLE, 
        DESCRIPTION, 
        STATUS, 
        CREATOR,
        CREATOR_EMAIL
    ) VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssss',
        $data->TITLE,
        $data->DESCRIPTION,
        $data->STATUS,
        $data->CREATOR,
        $data->CREATOR_EMAIL
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

// Attempt to insert the task
if (insertTask($conn, $data)) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Task created successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to create task."));
}

$conn->close();
?>