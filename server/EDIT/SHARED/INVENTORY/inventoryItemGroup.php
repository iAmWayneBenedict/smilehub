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

    // Validate EMPLOYEE_NAME
    if (empty($data->EMPLOYEE_NAME)) {
        $errors['EMPLOYEE_NAME'] = "EMPLOYEE_NAME is required.";
    }

    // Validate EMPLOYEE_ID
    if (empty($data->EMPLOYEE_ID)) {
        $errors['EMPLOYEE_ID'] = "EMPLOYEE_ID is required.";
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
 * Function to check if the inventory group exists and retrieve the old group name
 *
 * @param mysqli $conn The database connection object
 * @param int $id The ID of the inventory group
 * @return string|null The old group name if it exists, null otherwise
 */
function getOldGroupName($conn, $id) {
    $query = "SELECT NAME FROM inventory_group_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    return $row ? $row['NAME'] : null;
}

/**
 * Function to log the delete action into the inventory_logs_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing EMPLOYEE_ID, EMPLOYEE_NAME and NAME
 * @return bool True if the log insertion is successful, false otherwise
 */
function logInventoryAction($conn, $data, $oldGroupName) {
    $action = 'Updated a group from ' . $oldGroupName . ' to ' . $data->NAME;

    $query = "INSERT INTO inventory_logs_table (EMPLOYEE_ID, NAME, ITEM_GROUP, ACTION) 
              VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssss', $data->EMPLOYEE_ID, $data->EMPLOYEE_NAME, $data->NAME, $action);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

/**
 * Function to update an inventory group in the inventory_group_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing group details
 * @param string $oldGroupName The old group name to update related items
 * @return bool True if the update is successful, false otherwise
 */
function updateInventoryGroup($conn, $data, $oldGroupName) {
    // Update inventory group name
    $query1 = "UPDATE inventory_group_table SET NAME = ?, DATETIME = NOW() WHERE ID = ?";
    
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param('si', $data->NAME, $data->ID);
    $result1 = $stmt1->execute();
    $stmt1->close();

    // Update ITEM_GROUP in inventory_item_table if the group name changes
    $query2 = "UPDATE inventory_item_table SET ITEM_GROUP = ?, DATETIME = NOW() WHERE ITEM_GROUP = ?";
    
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param('ss', $data->NAME, $oldGroupName); // Use the old group name
    $result2 = $stmt2->execute();
    $stmt2->close();

    return $result1 && $result2;
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

// Fetch the old group name before updating
$oldGroupName = getOldGroupName($conn, $data->ID);
if ($oldGroupName === null) {
    http_response_code(404);
    echo json_encode(array("message" => "Inventory group not found."));
    exit;
}

// Check if the inventory group exists
if (!inventoryGroupExists($conn, $data->ID)) {
    http_response_code(404);
    echo json_encode(array("message" => "Inventory group not found."));
    exit;
}

// Log the deletion action
if (!logInventoryAction($conn, $data, $oldGroupName)) {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to log the inventory action."));
    exit;
}

// Attempt to update the inventory group
if (updateInventoryGroup($conn, $data, $oldGroupName)) {
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
