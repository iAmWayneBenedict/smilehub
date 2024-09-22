<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateEditInventoryGroupData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Group ID is required.";
    }

    // Validate name
    if (empty($data->NAME)) {
        $errors['NAME'] = "Group name is required.";
    }

    return $errors;
}

/**
 * Function to check if the inventory group exists
 *
 * @param mysqli $conn The database connection object
 * @param int $id The ID of the inventory group
 * @return bool True if the group exists, false otherwise
 */
function inventoryGroupExists($conn, $id) {
    $query = "SELECT * FROM inventory_group_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->num_rows > 0;
}

/**
 * Function to update an inventory group in the inventory_group_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing group details
 * @return bool True if the update is successful, false otherwise
 */
function updateInventoryGroup($conn, $data) {
    $query = "UPDATE inventory_group_table SET NAME = ?, DATETIME = NOW() WHERE ID = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $data->NAME, $data->ID);
    
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateEditInventoryGroupData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if the inventory group exists
if (!inventoryGroupExists($conn, $data->ID)) {
    http_response_code(404);
    echo json_encode(array("message" => "Inventory group not found."));
    exit;
}

// Attempt to update the inventory group
if (updateInventoryGroup($conn, $data)) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Inventory group updated successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update inventory group."));
}

$conn->close();
?>
