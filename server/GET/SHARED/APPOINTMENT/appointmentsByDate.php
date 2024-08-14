<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFetchByDateData($data) {
    $errors = [];

    // Validate appointment date
    if (empty($data->APPOINTMENT_DATE)) {
        $errors['APPOINTMENT_DATE'] = "Appointment date is required.";
    }

    return $errors;
}

/**
 * Function to fetch appointments by date
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the appointment date
 * @return array An array of appointments scheduled for the given date
 */
function fetchAppointmentsByDate($conn, $data) {
    // Fetch appointments for the given date
    $query = "SELECT * FROM appointment_table WHERE APPOINTMENT_DATE = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $data->APPOINTMENT_DATE);
    $stmt->execute();
    $result = $stmt->get_result();

    $appointments = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $appointments[] = $row;
        }
    }

    $stmt->close();
    return $appointments;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFetchByDateData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch appointments by date
$appointments = fetchAppointmentsByDate($conn, $data);

// Return the list as a JSON response
if (!empty($appointments)) {
    http_response_code(200);
    echo json_encode($appointments);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No appointments found for the given date."));
}

$conn->close();
?>