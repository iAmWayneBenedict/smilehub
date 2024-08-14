<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the status update request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Appointment ID is required.";
    }

    // Validate status
    if (empty($data->STATUS)) {
        $errors['STATUS'] = "Status is required.";
    }
    else{
        // Validate status value (assuming only specific statuses are allowed)
        $allowedStatuses = ['Pending', 'On-going', 'Completed', 'Cancelled'];
        if (!in_array($data->STATUS, $allowedStatuses)) {
            $errors['STATUS'] = "Invalid status value.";
        }
    }

    return $errors;
}

/**
 * Function to update the status of an appointment
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the appointment ID and new status
 * @return bool True if the status update is successful, false otherwise
 */
function updateAppointmentStatus($conn, $data) {
    // Check if the appointment exists
    $queryCheckAppointment = "SELECT * FROM appointment_table WHERE ID = ?";
    $stmtCheckAppointment = $conn->prepare($queryCheckAppointment);
    $stmtCheckAppointment->bind_param('i', $data->ID);
    $stmtCheckAppointment->execute();
    $resultCheckAppointment = $stmtCheckAppointment->get_result();

    if($resultCheckAppointment->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("message" => "Appointment not found."));
        exit;
    }

    // Update the status of the appointment
    $query = "UPDATE appointment_table SET STATUS = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $data->STATUS, $data->ID);
    $result = $stmt->execute();
    $stmt->close();
    
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the status update request data
$validationErrors = validateRequestData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to update the appointment status
if (updateAppointmentStatus($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Appointment status updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update appointment status."));
}

$conn->close();
?>
