<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to get appointments with optional status filtering
 *
 * @param mysqli $conn The database connection object
 * @param string|null $status The status to filter by, or null to select all
 * @return array An array of appointment lists
 */
function appointments($conn, $status = null) {
    // Base query to select all appointment lists
    $query = "SELECT * FROM appointment_table";
    
    // Modify query if a status filter is provided
    if ($status !== null) {
        $query .= " WHERE status = ?";
    }

    // Prepare and execute the query
    $stmt = $conn->prepare($query);
    if ($status !== null) {
        $stmt->bind_param("s", $status);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $appointments[] = $row;
        }
    }

    return $appointments;
}

// Get the status from the request, if available
$status = isset($_GET['status']) ? $_GET['status'] : null;

// Get the list of appointments with optional status filtering
$appointments = appointments($conn, $status);

// Return the list as a JSON response
if (!empty($appointments)) {
    http_response_code(200);
    echo json_encode($appointments);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No available appointment."));
}

$conn->close();
?>