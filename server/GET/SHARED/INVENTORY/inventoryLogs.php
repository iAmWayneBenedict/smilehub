<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to fetch all inventory logs
 *
 * @param mysqli $conn The database connection object
 * @return array An array of inventory logs
 */
function fetchAllInventoryLogs($conn) {
    $query = "SELECT * FROM inventory_logs_table ORDER BY DATETIME DESC";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $logs = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $logs[] = $row;
        }
    }

    $stmt->close();
    return $logs;
}

// Fetch all inventory logs
$logs = fetchAllInventoryLogs($conn);

// Return the list of inventory logs as a JSON response
if (!empty($logs)) {
    http_response_code(200);
    echo json_encode($logs);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No inventory logs found."));
}

$conn->close();
?>