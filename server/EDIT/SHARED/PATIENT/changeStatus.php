<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateUpdateRoleData($data) {
    $errors = [];

    // Validate patient ID
    if (empty($data->ID)) {
        $errors['ID'] = "Patient ID is required.";
    }

    // Validate role
    if (empty($data->ROLE)) {
        $errors['ROLE'] = "Role is required.";
    } elseif (!in_array($data->ROLE, ['PATIENT', 'ARCHIVE'])) {
        $errors['ROLE'] = "Invalid role value.";
    }

    return $errors;
}

/**
 * Function to update the patient's role
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the patient ID and new role
 * @return bool True if the update was successful, false otherwise
 */
function updatePatientRole($conn, $data) {
    // Prepare the update query
    $query = "UPDATE patient_table SET ROLE = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $data->ROLE, $data->ID);
    
    // Execute the query and check if the update was successful
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        $stmt->close();
        return true;
    } else {
        $stmt->close();
        return false;
    }
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateUpdateRoleData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to update the patient's role
$updateSuccessful = updatePatientRole($conn, $data);

// Return the result as a JSON response
if ($updateSuccessful) {
    http_response_code(200);
    echo json_encode(array("message" => "Patient account status updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update patient account status. Please check the patient ID."));
}

$conn->close();
?>
