<?php
require_once "../../connection.php";
require_once "../../cors.php";
require_once "../../VALIDATORS/email.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

    // Validate fullname
    if (empty($data->FULLNAME)) {
        $errors['FULLNAME'] = "Full name is required.";
    }

    // Validate email
    if (empty($data->EMAIL)) {
        $errors['EMAIL'] = "Email is required.";
    }

    // Validate email format
    $emailErrors = validateEmail($data->EMAIL);
    if (!empty($emailErrors)) {
        $errors = array_merge($errors, $emailErrors);
    }

    // Validate phone number
    if (empty($data->PHONE)) {
        $errors['PHONE'] = "Phone number is required.";
    }

    // Validate appointment date
    if (empty($data->APPOINTMENT_DATE)) {
        $errors['APPOINTMENT_DATE'] = "Appointment date is required.";
    }

    // Validate appointment time
    if (empty($data->APPOINTMENT_TIME)) {
        $errors['APPOINTMENT_TIME'] = "Appointment time is required.";
    }

    // Validate purpose of visit
    if (empty($data->PURPOSE)) {
        $errors['PURPOSE'] = "Purpose is required.";
    }

    return $errors;
}

/**
 * Function to insert a new appointment into the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing user details
 * @return bool True if the appointment is created successfully, false otherwise
 */
function appointment($conn, $data) {
    // Check if the user is already have an appointment
    $queryHaveAppointment = "SELECT * FROM appointment_table WHERE EMAIL=? AND STATUS = 'Pending'";
    $stmtHaveAppointment = $conn->prepare($queryHaveAppointment);
    $stmtHaveAppointment->bind_param('s', $data->EMAIL);
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


    // Appointment Status
    $STATUS = "Pending";

    $query = "INSERT INTO appointment_table (
        FULLNAME,
        EMAIL,
        PHONE,
        APPOINTMENT_DATE,
        APPOINTMENT_TIME,
        PURPOSE,
        STATUS)
        VALUES
        (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssssss',
        $data->FULLNAME,
        $data->EMAIL,
        $data->PHONE,
        $data->APPOINTMENT_DATE,
        $data->APPOINTMENT_TIME,
        $data->PURPOSE,
        $STATUS
    );
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateRequestData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to create an appointment
if (appointment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Appointment created successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to create an appointment."));
}

$conn->close();
?>