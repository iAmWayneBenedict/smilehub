<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFetchByIdData($data) {
    $errors = [];

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "Item ID is required.";
    }

    return $errors;
}

/**
 * Function to fetch an inventory item by ID
 *
 * @param mysqli $conn The database connection object
 * @param int $id The item ID to fetch
 * @return array|null The inventory item details or null if not found
 */
function fetchInventoryItemById($conn, $id) {
    $query = "SELECT ID, NAME, ITEM_GROUP, LOCATION, QUANTITY, DATETIME FROM inventory_item_table WHERE ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    $item = null;
    if ($result->num_rows > 0) {
        $item = $result->fetch_assoc();
    }

    $stmt->close();
    return $item;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFetchByIdData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Fetch the inventory item by ID
$item = fetchInventoryItemById($conn, $data->ID);

// Return the item details as a JSON response
if (!empty($item)) {
    http_response_code(200);
    echo json_encode($item);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Item not found."));
}

$conn->close();
?>