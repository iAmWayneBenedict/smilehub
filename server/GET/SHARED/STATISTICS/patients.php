<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

// Function to get the total count of patients and count by gender
function getPatientCounts($conn) {
    $data = [];

    // Total patients count
    $queryTotal = "SELECT COUNT(*) as total_patients FROM patient_table WHERE ROLE = 'PATIENT'";
    $resultTotal = $conn->query($queryTotal);

    if (!$resultTotal) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to retrieve total patients count."]);
        exit;
    }

    if ($resultTotal->num_rows > 0) {
        $data['total_patients'] = $resultTotal->fetch_assoc()['total_patients'];
    } else {
        $data['total_patients'] = 0;
    }

    // Count by gender
    $queryGender = "SELECT GENDER, COUNT(*) as count FROM patient_table WHERE ROLE = 'PATIENT' GROUP BY GENDER";
    $resultGender = $conn->query($queryGender);

    if (!$resultGender) {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to retrieve gender counts."));
        exit;
    }

    $data['gender_counts'] = [];
    if ($resultGender->num_rows > 0) {
        while ($row = $resultGender->fetch_assoc()) {
            $data['gender_counts'][$row['GENDER']] = $row['count'];
        }
    } else {
        $data['gender_counts']['Male'] = 0;
        $data['gender_counts']['Female'] = 0;
    }

    return $data;
}

// Execute the function and return the data as JSON
try {
    $data = getPatientCounts($conn);
    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An unexpected error occurred."]);
}

$conn->close();
?>