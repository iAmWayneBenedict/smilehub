<?php
require_once "../../../connection.php";
require_once "../../../cors.php";
require_once "../../../VALIDATORS/password.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validatePasswordUpdateData($data) {
    $errors = [];

    // Validate employee id
    if (empty($data->ID)) {
        $errors['ID'] = "Employee ID is required.";
    }
    
    // Validate previous password
    if (empty($data->PREVIOUS_PASSWORD)) {
        $errors['PREVIOUS_PASSWORD'] = "Previous password is required.";
    }

    // Validate new password
    $passwordErrors = validatePassword($data->NEW_PASSWORD);
    if (!empty($passwordErrors)) {
        $errors = array_merge($errors, $passwordErrors);
    }

    return $errors;
}

/**
 * Function to update the employee's password in the database
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the passwords
 * @return bool True if the password is updated successfully, false otherwise
 */
function updateEmployeePassword($conn, $data) {
    // Fetch the current password hash for the employee
    $query = "SELECT PASSWORD FROM employee_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->ID);
    $stmt->execute();
    $stmt->bind_result($currentPasswordHash);
    $stmt->fetch();
    $stmt->close();

    // Verify the previous password
    if (!password_verify($data->PREVIOUS_PASSWORD, $currentPasswordHash)) {
        http_response_code(400);
        echo json_encode(array("message" => "Previous password is incorrect."));
        exit;
    }

    // Hash the new password
    $newPasswordHash = password_hash($data->NEW_PASSWORD, PASSWORD_DEFAULT);

    // Update the password in the database
    $query = "UPDATE employee_table SET PASSWORD = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $newPasswordHash, $data->ID);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validatePasswordUpdateData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to update the password
if (updateEmployeePassword($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Password updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update password."));
}

$conn->close();
?>