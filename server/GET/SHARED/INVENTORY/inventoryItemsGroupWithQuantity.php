<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to fetch inventory groups with their quantities
 *
 * @param mysqli $conn The database connection object
 * @return array An array of inventory groups with quantities
 */
function fetchInventoryGroupsWithQuantities($conn) {
    $query = "
        SELECT g.ID, g.NAME AS GROUP_NAME, COALESCE(SUM(i.QUANTITY), 0) AS QUANTITY
        FROM inventory_group_table g
        LEFT JOIN inventory_item_table i ON g.NAME = i.ITEM_GROUP
        GROUP BY g.ID, g.NAME
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $groups = [];
    while ($row = $result->fetch_assoc()) {
        $groups[] = $row;
    }

    $stmt->close();
    return $groups;
}

// Get the list of inventory groups with quantities
$groups = fetchInventoryGroupsWithQuantities($conn);

// Return the groups as a JSON response
if (!empty($groups)) {
    http_response_code(200);
    echo json_encode($groups);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No inventory groups found."));
}

$conn->close();
?>