<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to fetch available appointment times
 *
 * @param mysqli $conn The database connection object
 * @param string $appointment_date The date for which to fetch available times
 * @return array An array of available times
 */
function getAvailableTimes($conn, $appointment_date) {
    // SQL query to get available times
    $query = "
        SELECT t.TIME
        FROM appointment_time_table t
        LEFT JOIN appointment_table a
        ON t.TIME = a.APPOINTMENT_TIME
        AND a.APPOINTMENT_DATE = ?
        WHERE a.APPOINTMENT_TIME IS NULL
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $appointment_date);
    $stmt->execute();
    $result = $stmt->get_result();

    $availableTimes = [];
    while ($row = $result->fetch_assoc()) {
        $availableTimes[] = $row['TIME'];
    }
    $stmt->close();

    return $availableTimes;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the date
if (empty($data->APPOINTMENT_DATE)) {
    http_response_code(400);
    echo json_encode(array("error" => "Appointment date is required."));
    exit;
}

// Appointment date coming from front end
$appointment_date = $data->APPOINTMENT_DATE;

// Fetch available times
$availableTimes = getAvailableTimes($conn, $appointment_date);

if (!empty($availableTimes)) {
    http_response_code(200);
    echo json_encode(array("available_times" => $availableTimes));
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No available times for the selected date."));
}

$conn->close();
?>
