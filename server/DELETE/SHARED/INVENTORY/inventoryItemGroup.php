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

    // Validate EMPLOYEE_ID
    if (empty($data->EMPLOYEE_ID)) {
        $errors['EMPLOYEE_ID'] = "EMPLOYEE_ID is required.";
    }

    // Validate NAME
    if (empty($data->NAME)) {
        $errors['NAME'] = "NAME is required.";
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
 * Function to get the ITEM_GROUP from inventory_group_table
 *
 * @param mysqli $conn The database connection object
 * @param int $id The ID of the inventory group
 * @return string The item group, or null if not found
 */
function getItemGroup($conn, $id) {
    $query = "SELECT NAME FROM inventory_group_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['NAME'];
    }

    return null;
}

/**
 * Function to log the delete action into the inventory_logs_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing EMPLOYEE_ID and NAME
 * @param string $itemGroup The item group that is being deleted
 * @return bool True if the log insertion is successful, false otherwise
 */
function logInventoryAction($conn, $data, $itemGroup) {
    $query = "INSERT INTO inventory_logs_table (EMPLOYEE_ID, NAME, ITEM_GROUP, ACTION) 
              VALUES (?, ?, ?, 'Deleted a group')";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sss', $data->EMPLOYEE_ID, $data->NAME, $itemGroup);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
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

// Retrieve the ITEM_GROUP
$itemGroup = getItemGroup($conn, $data->ID);
if ($itemGroup === null) {
    http_response_code(404);
    echo json_encode(array("message" => "Item group not found."));
    exit;
}

// Log the deletion action
if (!logInventoryAction($conn, $data, $itemGroup)) {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to log the inventory action."));
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
