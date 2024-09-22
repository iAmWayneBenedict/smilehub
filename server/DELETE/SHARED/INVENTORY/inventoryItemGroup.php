<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the delete request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateDeleteInventoryGroupData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Group ID is required.";
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
 * Function to delete an inventory group from the inventory_group_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing the group ID
 * @return bool True if the deletion is successful, false otherwise
 */
function deleteInventoryGroup($conn, $data) {
    $query = "DELETE FROM inventory_group_table WHERE ID = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $data->ID);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the delete request data
$validationErrors = validateDeleteInventoryGroupData($data);
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

// Attempt to delete the inventory group
if (deleteInventoryGroup($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Inventory group deleted successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete inventory group."));
}

$conn->close();
?>