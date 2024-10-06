<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the delete request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateDeleteData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Item ID is required.";
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
 * Function to check if the item exists by ID
 *
 * @param mysqli $conn The database connection object
 * @param int $id The item ID to check
 * @return bool True if the item exists, false otherwise
 */
function checkItemExists($conn, $id) {
    $queryCheck = "SELECT * FROM inventory_item_table WHERE ID = ?";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->bind_param('i', $id);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    return $resultCheck->num_rows > 0; // Returns true if item exists
}

/**
 * Function to get the item name and item group from the inventory_item_table
 *
 * @param mysqli $conn The database connection object
 * @param int $id The item ID
 * @return array|null An associative array containing 'NAME' and 'ITEM_GROUP', or null if not found
 */
function getItemDetails($conn, $id) {
    $query = "SELECT NAME, ITEM_GROUP FROM inventory_item_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'ITEM_NAME' => $row['NAME'],
            'ITEM_GROUP' => $row['ITEM_GROUP']
        ];
    }

    return null;
}

/**
 * Function to log the delete action into the inventory_logs_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing EMPLOYEE_ID and NAME
 * @param array $itemDetails An associative array containing 'NAME' and 'ITEM_GROUP', 'ITEM_NAME'
 * @return bool True if the log insertion is successful, false otherwise
 */
function logInventoryAction($conn, $data, $itemDetails) {
    $query = "INSERT INTO inventory_logs_table (EMPLOYEE_ID, NAME, ITEM_GROUP, ITEM_NAME, ACTION) 
              VALUES (?, ?, ?, ?, 'Deleted an item')";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssss', $data->EMPLOYEE_ID, $data->NAME, $itemDetails['ITEM_GROUP'], $itemDetails['ITEM_NAME']);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

/**
 * Function to delete an inventory item
 *
 * @param mysqli $conn The database connection object
 * @param int $id The item ID to delete
 * @return bool True if the deletion is successful, false otherwise
 */
function deleteInventoryItem($conn, $id) {
    $query = "DELETE FROM inventory_item_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the delete request data
$validationErrors = validateDeleteData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if the item exists
if (!checkItemExists($conn, $data->ID)) {
    http_response_code(404);
    echo json_encode(array("message" => "Item not found."));
    exit;
}

// Retrieve the item details (NAME and ITEM_GROUP)
$itemDetails = getItemDetails($conn, $data->ID);
if ($itemDetails === null) {
    http_response_code(404);
    echo json_encode(array("message" => "Item not found."));
    exit;
}

// Log the deletion action
if (!logInventoryAction($conn, $data, $itemDetails)) {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to log the inventory action."));
    exit;
}

// Attempt to delete the inventory item
if (deleteInventoryItem($conn, $data->ID)) {
    http_response_code(200);
    echo json_encode(array("message" => "Item deleted successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete item."));
}

$conn->close();
?>
