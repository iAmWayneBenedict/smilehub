<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateInventoryGroupData($data) {
    $errors = [];

    // Validate name
    if (empty($data->NAME)) {
        $errors['NAME'] = "Group name is required.";
    }

    return $errors;
}

/**
 * Function to check if an inventory group already exists
 *
 * @param mysqli $conn The database connection object
 * @param string $name The name of the group to check
 * @return bool True if exists, false otherwise
 */
function inventoryGroupExists($conn, $name) {
    $query = "SELECT * FROM inventory_group_table WHERE NAME = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $name);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->num_rows > 0; // Returns true if the group exists
}

/**
 * Function to insert a new inventory group into the inventory_group_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing group details
 * @return bool True if the insertion is successful, false otherwise
 */
function insertInventoryGroup($conn, $data) {
    $query = "INSERT INTO inventory_group_table (NAME, DATETIME) VALUES (?, NOW())";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $data->NAME);
    
    $result = $stmt->execute();
    $stmt->close();

    return $result;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateInventoryGroupData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if the inventory group already exists
if (inventoryGroupExists($conn, $data->NAME)) {
    http_response_code(400);
    echo json_encode(array("message" => "Group name already exists."));
    exit;
}

// Attempt to insert the inventory group
if (insertInventoryGroup($conn, $data)) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Inventory group added successfully."
    ));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to add inventory group."));
}

$conn->close();
?>