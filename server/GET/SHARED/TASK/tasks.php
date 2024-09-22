<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to get tasks with optional status filtering and sorting
 *
 * @param mysqli $conn The database connection object
 * @param string|null $status The status to filter by, or null to select all
 * @return array An array of task lists
 */
function fetchTasks($conn, $status = null) {
    // Base query to select all task lists with sorting
    $query = "SELECT * FROM task_table";
    
    // Modify query if a status filter is provided
    if ($status !== null) {
        $query .= " WHERE STATUS = ?";
    }
    
    // Always sort by DATETIME from latest to oldest
    $query .= " ORDER BY DATETIME DESC";

    // Prepare and execute the query
    $stmt = $conn->prepare($query);
    if ($status !== null) {
        $stmt->bind_param("s", $status);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $tasks = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
    }

    return $tasks;
}

// Get the status from the request, if available
$status = isset($_GET['status']) ? $_GET['status'] : null;

// Get the list of tasks with optional status filtering and sorting
$tasks = fetchTasks($conn, $status);

// Return the list as a JSON response
if (!empty($tasks)) {
    http_response_code(200);
    echo json_encode($tasks);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No available tasks."));
}

$conn->close();
?>