<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to fetch all inventory groups
 *
 * @param mysqli $conn The database connection object
 * @return array An array of inventory groups
 */
function fetchAllInventoryGroups($conn) {
    $query = "SELECT * FROM inventory_group_table ORDER BY DATETIME DESC";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $groups = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $groups[] = $row;
        }
    }

    $stmt->close();
    return $groups;
}

// Fetch all inventory groups
$groups = fetchAllInventoryGroups($conn);

// Return the list of inventory groups as a JSON response
if (!empty($groups)) {
    http_response_code(200);
    echo json_encode($groups);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No inventory groups found."));
}

$conn->close();
?>