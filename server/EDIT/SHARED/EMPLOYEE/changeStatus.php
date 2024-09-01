<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateUpdateStatusData($data) {
    $errors = [];

    // Validate employee ID
    if (empty($data->ID)) {
        $errors['ID'] = "Employee ID is required.";
    }

    // Validate status
    if (empty($data->STATUS)) {
        $errors['STATUS'] = "STATUS is required.";
    } elseif (!in_array($data->STATUS, ['ACTIVE', 'ARCHIVE'])) {
        $errors['STATUS'] = "Invalid status value.";
    }

    return $errors;
}

/**
 * Function to update the employee's account status
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the employee ID and new status
 * @return bool True if the update was successful, false otherwise
 */
function updateEmployeeAccountStatus($conn, $data) {
    // Prepare the update query
    $query = "UPDATE employee_table SET STATUS = ? WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $data->STATUS, $data->ID);
    
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
$validationErrors = validateUpdateStatusData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Attempt to update the employee's account statuts
$updateSuccessful = updateEmployeeAccountStatus($conn, $data);

// Return the result as a JSON response
if ($updateSuccessful) {
    http_response_code(200);
    echo json_encode(array("message" => "Employee account status updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update employee account status. Please check the employee ID."));
}

$conn->close();
?>
