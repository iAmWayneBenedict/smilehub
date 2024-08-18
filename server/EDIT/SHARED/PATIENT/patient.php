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

    // Validate Patient's id
    if (empty($data->ID)) {
        $errors['ID'] = "Patient ID is required.";
    }

    // Validate first name
    if (empty($data->FIRSTNAME)) {
        $errors['FIRSTNAME'] = "First name is required.";
    }

    // Validate last name
    if (empty($data->LASTNAME)) {
        $errors['LASTNAME'] = "Last name is required.";
    }

    // Validate birthday
    if (empty($data->BIRTHDATE)) {
        $errors['BIRTHDATE'] = "Date of birth is required.";
    }

    // Validate gender
    if (empty($data->GENDER)) {
        $errors['GENDER'] = "Gender is required.";
    }

    // Validate phone number
    if (empty($data->PHONE)) {
        $errors['PHONE'] = "Phone number is required.";
    }

    // Validate email
    $emailErrors = validateEmail($data->EMAIL);
    if (!empty($emailErrors)) {
        $errors = array_merge($errors, $emailErrors);
    }

    return $errors;
}

/**
 * Function to update patient information in the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing patient details
 * @return bool True if the patient info is updated successfully, false otherwise
 */
function updatePatientInfo($conn, $data) {
    // Check if the email already exists in the database, excluding the current record's email
    $queryEmail = "SELECT * FROM patient_table WHERE EMAIL=? AND ID!=?";
    $stmtEmail = $conn->prepare($queryEmail);
    $stmtEmail->bind_param('si', $data->EMAIL, $data->ID);
    $stmtEmail->execute();
    $resultEmail = $stmtEmail->get_result();

    if($resultEmail->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    // Check if the email already exists in the employee database
    $queryEmailEmployee = "SELECT * FROM employee_table WHERE EMAIL=?";
    $stmtEmailEmployee = $conn->prepare($queryEmailEmployee);
    $stmtEmailEmployee->bind_param('s', $data->EMAIL);
    $stmtEmailEmployee->execute();
    $resultEmailEmployee = $stmtEmailEmployee->get_result();

    if($resultEmailEmployee->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    $query = "UPDATE patient_table SET 
        FIRSTNAME=?,
        LASTNAME=?,
        BIRTHDATE=?,
        GENDER=?,
        PHONE=?,
        EMAIL=?
        WHERE ID=?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssssi',
        $data->FIRSTNAME,
        $data->LASTNAME,
        $data->BIRTHDATE,
        $data->GENDER,
        $data->PHONE,
        $data->EMAIL,
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

// Attempt to update the patient information
if (updatePatientInfo($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Patient information updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update patient information."));
}

$conn->close();
?>