<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @param mysqli $conn The database connection object
 * @return array An array of errors if any validation fails
 */
function validateEditData($data, $conn) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Item ID is required.";
    }

    // Validate name
    if (empty($data->NAME)) {
        $errors['NAME'] = "Item name is required.";
    }

    // Validate item group
    if (empty($data->ITEM_GROUP)) {
        $errors['ITEM_GROUP'] = "Item group is required.";
    }

    // Validate location
    if (empty($data->LOCATION)) {
        $errors['LOCATION'] = "Location is required.";
    }

    // Validate quantity
    if (empty($data->QUANTITY)) {
        $errors['QUANTITY'] = "Quantity is required.";
    }

    // Validate EMPLOYEE_NAME
    if (empty($data->EMPLOYEE_NAME)) {
        $errors['EMPLOYEE_NAME'] = "EMPLOYEE_NAME is required.";
    }

    // Validate EMPLOYEE_ID
    if (empty($data->EMPLOYEE_ID)) {
        $errors['EMPLOYEE_ID'] = "EMPLOYEE_ID is required.";
    }

    // Check for existing item with the same name and group
    $queryCheck = "SELECT * FROM inventory_item_table WHERE NAME = ? AND ITEM_GROUP = ? AND ID != ?";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->bind_param('ssi', $data->NAME, $data->ITEM_GROUP, $data->ID);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    
    if ($resultCheck->num_rows > 0) {
        $errors['NAME'] = "Item with the same name and group already exists.";
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
 * Function to retrieve the old quantity of the item
 *
 * @param mysqli $conn The database connection object
 * @param int $id The item ID
 * @return int|null The old quantity if it exists, null otherwise
 */
function getOldQuantity($conn, $id) {
    $query = "SELECT QUANTITY FROM inventory_item_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    return $row ? $row['QUANTITY'] : null;
}

/**
 * Function to log the inventory action
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing item details
 * @param int $oldQuantity The old quantity of the item
 * @return bool True if the log insertion is successful, false otherwise
 *
 * This function logs the action of updating an inventory item's quantity, including:
 * - The employee ID who performed the action
 * - The employee name
 * - The item group
 * - The item name
 * - The action description (in this case, "Updated the item quantity")
 * - The old quantity before the update
 * - The new quantity after the update
 */
function logInventoryAction($conn, $data, $oldQuantity) {
    $action = 'Updated the item quantity';

    $query = "INSERT INTO inventory_logs_table (EMPLOYEE_ID, NAME, ITEM_GROUP, ITEM_NAME, ACTION, FROM_QTY, TO_QTY) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssssss', $data->EMPLOYEE_ID, $data->EMPLOYEE_NAME, $data->ITEM_GROUP, $data->NAME, $action, $oldQuantity, $data->QUANTITY);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

/**
 * Function to update an inventory item
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing inventory item details
 * @return bool True if the update is successful, false otherwise
 */
function updateInventoryItem($conn, $data) {
    // Update the item
    $query = "UPDATE inventory_item_table SET 
        NAME = ?, 
        ITEM_GROUP = ?, 
        LOCATION = ?, 
        QUANTITY = ?,
        DATETIME = NOW() 
    WHERE ID = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssi',
        $data->NAME,
        $data->ITEM_GROUP,
        $data->LOCATION,
        $data->QUANTITY,
        $data->ID
    );

    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateEditData($data, $conn);
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

// Retrieve the old quantity before updating
$oldQuantity = getOldQuantity($conn, $data->ID);

// Attempt to update the inventory item
if (updateInventoryItem($conn, $data)) {
    // Log the action if the quantity has changed
    if ($oldQuantity !== null && $oldQuantity != $data->QUANTITY) {
        if (!logInventoryAction($conn, $data, $oldQuantity)) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to log the inventory action."));
            exit;
        }
    }
    
    http_response_code(200);
    echo json_encode(array("message" => "Item updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update item."));
}

$conn->close();
?>
