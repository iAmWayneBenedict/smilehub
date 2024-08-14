<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the reschedule request data
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

    // Validate appointment date
    if (empty($data->APPOINTMENT_DATE)) {
        $errors['APPOINTMENT_DATE'] = "New appointment date is required.";
    }

    // Validate appointment time
    if (empty($data->APPOINTMENT_TIME)) {
        $errors['APPOINTMENT_TIME'] = "New appointment time is required.";
    }

    return $errors;
}

/**
 * Function to reschedule an appointment
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the new date and time
 * @return bool True if the reschedule is successful, false otherwise
 */
function rescheduleAppointment($conn, $data) {
    // Check if the appointment exists and is pending
    $queryCheckStatus = "SELECT STATUS FROM appointment_table WHERE ID = ?";
    $stmtCheckStatus = $conn->prepare($queryCheckStatus);
    $stmtCheckStatus->bind_param('i', $data->ID);
    $stmtCheckStatus->execute();
    $resultCheckStatus = $stmtCheckStatus->get_result();

    if($resultCheckStatus->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("message" => "Appointment not found."));
        exit;
    }

    $appointment = $resultCheckStatus->fetch_assoc();

    if($appointment['STATUS'] !== 'Pending') {
        http_response_code(400);
        echo json_encode(array("message" => "You can only reschedule a pending appointment."));
        exit;
    }

    // Check if the date and time are already booked
    $queryBookedAlready = "SELECT * FROM appointment_table WHERE APPOINTMENT_DATE=? AND APPOINTMENT_TIME=? AND STATUS != 'Cancelled'";
    $stmtBookAlready = $conn->prepare($queryBookedAlready);
    $stmtBookAlready->bind_param('ss', $data->APPOINTMENT_DATE, $data->APPOINTMENT_TIME);
    $stmtBookAlready->execute();
    $resultBookAlready = $stmtBookAlready->get_result();

    if($resultBookAlready->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "The new date and time you've selected is already booked."));
        exit;
    }

    // Update the appointment date and time based on the ID
    $query = "UPDATE appointment_table SET APPOINTMENT_DATE = ?, APPOINTMENT_TIME = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssi', $data->APPOINTMENT_DATE, $data->APPOINTMENT_TIME, $data->ID);
    $result = $stmt->execute();
    $stmt->close();
    
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the reschedule request data
$validationErrors = validateRequestData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to reschedule the appointment
if (rescheduleAppointment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Appointment rescheduled successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to reschedule the appointment."));
}

$conn->close();
?>
