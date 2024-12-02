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
        $errors['ID'] = "Appointment ID is required.";
    }

    return $errors;
}

/**
 * Function to delete an appointment
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the appointment ID
 * @return bool True if the deletion is successful, false otherwise
 */
function deleteAppointment($conn, $data) {
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

    // Delete the appointment
    // $query = "DELETE FROM appointment_table WHERE ID = ?";
    $query = "UPDATE appointment_table SET STATUS = 'Archived' WHERE ID = ?";
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

// Attempt to delete the appointment
if (deleteAppointment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Appointment deleted successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete the appointment."));
}

$conn->close();
?>
