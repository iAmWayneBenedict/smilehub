<?php
require_once "../../connection.php";
require_once "../../cors.php";
require_once "../../VALIDATORS/email.php";
require_once "../../VALIDATORS/password.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateRequestData($data) {
    $errors = [];

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

    // Validate phone number
    if (empty($data->PHONE)) {
        $errors['PHONE'] = "Date of birth is required.";
    }

    // Validate email
    $emailErrors = validateEmail($data->EMAIL);
    if (!empty($emailErrors)) {
        $errors = array_merge($errors, $emailErrors);
    }

    // Validate password
    $passwordErrors = validatePassword($data->PASSWORD);
    if (!empty($passwordErrors)) {
        $errors = array_merge($errors, $passwordErrors);
    }

    return $errors;
}

/**
 * Function to insert a new user into the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing user details
 * @return bool True if the user is inserted successfully, false otherwise
 */
function register($conn, $data) {
    // Check if the email already exists in the database
    $queryEmail = "SELECT * FROM patient_table WHERE EMAIL=?";
    $stmtEmail = $conn->prepare($queryEmail);
    $stmtEmail->bind_param('s', $data->EMAIL);
    $stmtEmail->execute();
    $resultEmail = $stmtEmail->get_result();

    if($resultEmail->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    $ROLE = "PATIENT";
    // Hash the password
    $HASHED_PASSWORD = password_hash($data->PASSWORD, PASSWORD_DEFAULT);

    $query = "INSERT INTO patient_table (
        FIRSTNAME,
        LASTNAME,
        BIRTHDATE,
        GENDER,
        PHONE,
        EMAIL,
        PASSWORD,
        ROLE)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssssss',
        $data->FIRSTNAME,
        $data->LASTNAME,
        $data->BIRTHDATE,
        $data->GENDER,
        $data->PHONE,
        $data->EMAIL,
        $HASHED_PASSWORD,
        $ROLE
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

// Attempt to register the user
if (register($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "User registered successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to register user."));
}

$conn->close();
?>