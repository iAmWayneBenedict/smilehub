<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data for filters
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFilterData($data) {
    $errors = [];

    // Validate filter type
    if (empty($data->filterBy)) {
        $errors['filterBy'] = "Filter type (month or year) is required.";
    } elseif (!in_array($data->filterBy, ['month', 'year'])) {
        $errors['filterBy'] = "Invalid filter type. Use 'month' or 'year'.";
    }

    // Validate year if filter is by month
    if ($data->filterBy == 'month' && empty($data->year)) {
        $errors['year'] = "Year is required when filtering by month.";
    }

    return $errors;
}

/**
 * Function to get the appointment count for each month
 *
 * @param mysqli $conn The database connection object
 * @param int $year The year to filter by
 * @return array The monthly appointment counts
 */
function getMonthlyCompletedAppointments($conn, $year) {
    $data = array_fill(0, 12, 0); // Initialize array with 12 zeros for each month

    $query = "
        SELECT MONTH(APPOINTMENT_DATE) as month, COUNT(*) as count 
        FROM appointment_table 
        WHERE STATUS = 'Completed' AND YEAR(APPOINTMENT_DATE) = ?
        GROUP BY MONTH(APPOINTMENT_DATE)
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $year);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $data[(int)$row['month'] - 1] = (int)$row['count']; // Map month index to count
    }

    $stmt->close();
    return $data;
}

/**
 * Function to get the appointment count for each year
 *
 * @param mysqli $conn The database connection object
 * @return array The yearly appointment counts for the last 10 years + current year
 */
function getYearlyCompletedAppointments($conn) {
    $currentYear = date("Y");
    $startYear = $currentYear - 10;
    $years = range($startYear, $currentYear); // Generate array of years
    $data = array_fill(0, count($years), 0); // Initialize array with zeros

    $query = "
        SELECT YEAR(APPOINTMENT_DATE) as year, COUNT(*) as count 
        FROM appointment_table 
        WHERE STATUS = 'Completed' AND YEAR(APPOINTMENT_DATE) BETWEEN ? AND ?
        GROUP BY YEAR(APPOINTMENT_DATE)
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $startYear, $currentYear);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $index = array_search((int)$row['year'], $years);
        $data[$index] = (int)$row['count'];
    }

    $stmt->close();
    return ['data' => $data, 'categories' => $years];
}

// Get the request data from the body
$data = json_decode(file_get_contents("php://input"));

// If no data is provided, set the default filter to 'month' for the current year
if (empty($data)) {
    $data = (object) [
        'filterBy' => 'month',
        'year' => date("Y")
    ];
}

// Validate the request data
$validationErrors = validateFilterData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Filter by month or year
if ($data->filterBy == 'month') {
    // Monthly filter: return counts for each month of the provided year
    $response = [
        'data' => getMonthlyCompletedAppointments($conn, (int)$data->year),
        'categories' => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    ];
} elseif ($data->filterBy == 'year') {
    // Yearly filter: return counts for the last 10 years including the current year
    $response = getYearlyCompletedAppointments($conn);
}

// Return the response as JSON
http_response_code(200);
echo json_encode($response);

$conn->close();
?>