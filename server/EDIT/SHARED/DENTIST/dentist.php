<?php
require_once "../../../connection.php";
require_once "../../../cors.php";
require_once "../../../VALIDATORS/email.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

    // Validate dentist id
    if (empty($data->ID)) {
        $errors['ID'] = "Dentist ID is required.";
    }

    // Validate full name
    if (empty($data->FULLNAME)) {
        $errors['fullname'] = "Full name is required.";
    }

    // Validate email
    $emailErrors = validateEmail($data->EMAIL);
    if (!empty($emailErrors)) {
        $errors = array_merge($errors, $emailErrors);
    }

    return $errors;
}

/**
 * Function to update dentist information in the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing dentist details
 * @return bool True if the dentist info is updated successfully, false otherwise
 */
function updateDentistInfo($conn, $data) {
    // Check if the email already exists in the database, excluding the current record's email
    $queryEmail = "SELECT * FROM employee_table WHERE EMAIL=? AND ID!=?";
    $stmtEmail = $conn->prepare($queryEmail);
    $stmtEmail->bind_param('si', $data->EMAIL, $data->ID);
    $stmtEmail->execute();
    $resultEmail = $stmtEmail->get_result();

    if($resultEmail->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    // Check if the email already exists in the patient database
    $queryEmailPatient = "SELECT * FROM patient_table WHERE EMAIL=?";
    $stmtEmailPatient = $conn->prepare($queryEmailPatient);
    $stmtEmailPatient->bind_param('s', $data->EMAIL);
    $stmtEmailPatient->execute();
    $resultEmailPatient = $stmtEmailPatient->get_result();

    if($resultEmailPatient->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    $query = "UPDATE employee_table SET 
        FULLNAME=?,
        EMAIL=?,
        BIRTHDAY=?,
        GENDER=?
        WHERE ID=?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssi',
        $data->FULLNAME,
        $data->EMAIL,
        $data->BIRTHDAY,
        $data->GENDER,
        $data->ID
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

// Attempt to update the dentist information
if (updateDentistInfo($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Dentist information updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update dentist information."));
}

$conn->close();
?>