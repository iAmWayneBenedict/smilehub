<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to insert a new appointment into the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing appointment details
 * @return bool True if the appointment is inserted successfully, false otherwise
 */
function appointment($conn, $data) {
    // Query to select the patient details
    $queryPatient = "SELECT FIRSTNAME, LASTNAME, EMAIL, PHONE FROM patient_table WHERE ID=?";
    $stmtPatient = $conn->prepare($queryPatient);
    $stmtPatient->bind_param('i', $data->PATIENT_ID);
    $stmtPatient->execute();
    $resultPatient = $stmtPatient->get_result();
    
    if ($resultPatient->num_rows == 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Patient not found."));
        exit;
    }

    $patient = $resultPatient->fetch_assoc();

    // Check if the user is already have an appointment
    $queryHaveAppointment = "SELECT * FROM appointment_table WHERE EMAIL=? AND STATUS = 'Pending'";
    $stmtHaveAppointment = $conn->prepare($queryHaveAppointment);
    $stmtHaveAppointment->bind_param('s', $patient['EMAIL']);
    $stmtHaveAppointment->execute();
    $resultHaveAppointment = $stmtHaveAppointment->get_result();

    if($resultHaveAppointment->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "You already have a pending appointment from us."));
        exit;
    }

    // Check if the date is already booked
    $queryBookedAlready = "SELECT * FROM appointment_table WHERE APPOINTMENT_DATE=? AND APPOINTMENT_TIME=?";
    $stmtBookAlready = $conn->prepare($queryBookedAlready);
    $stmtBookAlready->bind_param('ss', $data->APPOINTMENT_DATE, $data->APPOINTMENT_TIME);
    $stmtBookAlready->execute();
    $resultBookAlready = $stmtBookAlready->get_result();

    if($resultBookAlready->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "The date and time you've selected is booked already."));
        exit;
    }

    // Prepare full name from first and last name
    $fullName = $patient['FIRSTNAME'] . " " . $patient['LASTNAME'];

    // Appointment Status
    $STATUS = "Pending";

    // Query to insert the appointment details
    $queryAppointment = "INSERT INTO appointment_table (
        FULLNAME, 
        EMAIL, 
        PHONE, 
        APPOINTMENT_DATE, 
        APPOINTMENT_TIME, 
        PURPOSE, 
        STATUS
    ) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmtAppointment = $conn->prepare($queryAppointment);
    $stmtAppointment->bind_param('sssssss',
        $fullName,
        $patient['EMAIL'],
        $patient['PHONE'],
        $data->APPOINTMENT_DATE,
        $data->APPOINTMENT_TIME,
        $data->PURPOSE,
        $STATUS
    );
    $result = $stmtAppointment->execute();
    $stmtAppointment->close();
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Attempt to schedule the appointment
if (appointment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Appointment created successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to create an appointment."));
}

$conn->close();
?>
