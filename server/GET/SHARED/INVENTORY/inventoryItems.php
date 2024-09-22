<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to fetch all inventory items and identify shortages
 *
 * @param mysqli $conn The database connection object
 * @return array An array containing all items and those with shortages
 */
function fetchAllInventoryItems($conn) {
    $query = "SELECT ID, NAME, ITEM_GROUP, LOCATION, QUANTITY FROM inventory_item_table";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    $itemsShortage = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
        if ($row['QUANTITY'] < 10) {
            $itemsShortage[] = $row;
        }
    }

    return [
        'all_items' => $items,
        'items_shortage' => $itemsShortage,
    ];
}

// Fetch all inventory items
$data = fetchAllInventoryItems($conn);

// Return the list as a JSON response
http_response_code(200);
echo json_encode($data);

$conn->close();
?>