<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to get appointments and patient data
 *
 * @param mysqli $conn The database connection object
 * @return array An array of appointment and patient data
 */
function getAppointmentsAndPatients($conn) {
    // Today's date for comparison
    $today = date("Y-m-d");

    // Query to fetch the necessary data, including patient ID, grouping by email
    $query = "
    SELECT 
        p.ID AS PATIENT_ID,
        MAX(a.FULLNAME) AS FULLNAME,  -- Apply MAX to handle ONLY_FULL_GROUP_BY
        MAX(CASE WHEN a.APPOINTMENT_DATE < ? THEN a.APPOINTMENT_DATE END) AS Last_Appointment,
        MIN(CASE WHEN a.APPOINTMENT_DATE >= ? THEN a.APPOINTMENT_DATE END) AS Next_Appointment,
        COALESCE(
            MAX(CASE WHEN a.APPOINTMENT_DATE < ? THEN a.PURPOSE END),
            MAX(CASE WHEN a.APPOINTMENT_DATE >= ? THEN a.PURPOSE END)
        ) AS DIAGNOSIS,
        COALESCE(
            MAX(CASE WHEN a.APPOINTMENT_DATE < ? THEN a.STATUS END),
            MAX(CASE WHEN a.APPOINTMENT_DATE >= ? THEN a.STATUS END)
        ) AS STATUS
    FROM appointment_table a
    JOIN patient_table p ON a.EMAIL = p.EMAIL
    GROUP BY p.ID, a.EMAIL
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssss", $today, $today, $today, $today, $today, $today);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $patients = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Reorder the array so ID is at the top
            $row = [
                'ID' => $row['PATIENT_ID'],
                'FULLNAME' => $row['FULLNAME'],
                'Last_Appointment' => $row['Last_Appointment'],
                'Next_Appointment' => $row['Next_Appointment'],
                'DIAGNOSIS' => $row['DIAGNOSIS'],
                'STATUS' => $row['STATUS']
            ];
            $patients[] = $row;
        }
    }

    // Query to fetch patient data that are not in the appointment table
    $patientQuery = "
        SELECT 
            p.ID,
            CONCAT(p.FIRSTNAME, ' ', p.LASTNAME) AS FULLNAME,
            NULL AS DIAGNOSIS,
            NULL AS STATUS,
            NULL AS Last_Appointment,
            NULL AS Next_Appointment
        FROM patient_table p
        LEFT JOIN appointment_table a ON p.EMAIL = a.EMAIL
        WHERE a.EMAIL IS NULL
    ";
    $result = $conn->query($patientQuery);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Reorder the array so ID is at the top
            $row = [
                'ID' => $row['ID'],
                'FULLNAME' => $row['FULLNAME'],
                'Last_Appointment' => $row['Last_Appointment'],
                'Next_Appointment' => $row['Next_Appointment'],
                'DIAGNOSIS' => $row['DIAGNOSIS'],
                'STATUS' => $row['STATUS']
            ];
            $patients[] = $row;
        }
    }

    // Sort the combined data by FULLNAME
    usort($patients, function($a, $b) {
        return strcmp($a['FULLNAME'], $b['FULLNAME']);
    });

    return ['patients' => $patients];
}

// Get the combined data from appointments and patients
$data = getAppointmentsAndPatients($conn);

// Return the list as a JSON response
if (!empty($data)) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No data found."));
}

$conn->close();
?>
