<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to fetch all inventory items
 *
 * @param mysqli $conn The database connection object
 * @return array An array of inventory items
 */
function fetchAllInventoryItems($conn) {
    $query = "SELECT ID, NAME, ITEM_GROUP, LOCATION, QUANTITY FROM inventory_item_table";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }

    return $items;
}

// Fetch all inventory items
$items = fetchAllInventoryItems($conn);

// Return the list as a JSON response
if (!empty($items)) {
    http_response_code(200);
    echo json_encode($items);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No inventory items found."));
}

$conn->close();
?>