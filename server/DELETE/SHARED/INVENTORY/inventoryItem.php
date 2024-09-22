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