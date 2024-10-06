<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateInventoryItemData($data) {
    $errors = [];

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

    return $errors;
}

/**
 * Function to check if an item with the same name and group exists
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing item details
 * @return bool True if exists, false otherwise
 */
function itemExists($conn, $data) {
    $query = "SELECT * FROM inventory_item_table WHERE NAME = ? AND ITEM_GROUP = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $data->NAME, $data->ITEM_GROUP);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result->num_rows > 0;
    $stmt->close();
    
    return $exists;
}

/**
 * Function to insert a new item into the inventory_item_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing item details
 * @return bool True if the insertion is successful, false otherwise
 */
function insertInventoryItem($conn, $data) {
    $query = "INSERT INTO inventory_item_table (
        NAME, 
        ITEM_GROUP, 
        LOCATION, 
        QUANTITY, 
        DATETIME
    ) VALUES (?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssss',
        $data->NAME,
        $data->ITEM_GROUP,
        $data->LOCATION,
        $data->QUANTITY
    );

    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

/**
 * Function to log the creation of an inventory group
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing group details
 * @return bool True if the log insertion is successful, false otherwise
 */
function logInventoryGroupAction($conn, $data) {
    $action = 'Added a new item in inventory group';

    $query = "INSERT INTO inventory_logs_table (EMPLOYEE_ID, NAME, ITEM_GROUP, ITEM_NAME, ACTION) 
              VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssss', $data->EMPLOYEE_ID, $data->EMPLOYEE_NAME, $data->ITEM_GROUP, $data->NAME, $action);
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateInventoryItemData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if the item with the same name and group exists
if (itemExists($conn, $data)) {
    http_response_code(400);
    echo json_encode(array("message" => "Item with the same name in this group already exists."));
    exit;
}

// Attempt to insert the inventory item
if (insertInventoryItem($conn, $data)) {
    // Log the action of creating a new inventory group
    if (!logInventoryGroupAction($conn, $data)) {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to log the inventory group action."));
        exit;
    }
    
    http_response_code(200);
    echo json_encode(array(
        "message" => "Item added to inventory successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to add item to inventory."));
}

$conn->close();
?>