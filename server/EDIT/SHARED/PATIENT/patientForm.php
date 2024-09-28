<?php
require_once "../../../connection.php";
require_once "../../../cors.php";

/**
 * Function to validate the request data for editing a patient form
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateEditPatientFormData($data) {
    $errors = [];

    // Validate ID and PATIENT_ID
    if (empty($data->ID)) {
        $errors['ID'] = "ID is required.";
    }
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate other required fields
    $requiredFields = [
        'TITLE', 'FIRST_NAME', 'LAST_NAME', 'OCCUPATION', 'BIRTHDAY', 
        'HOME_ADDRESS', 'CONTACT_NUMBER', 'EMAIL_ADDRESS', 'HEALTH_FUND', 
        'MEMBER_NUMBER', 'EMERGENCY_CONTACT_NAME', 'EMERGENCY_CONTACT_NUMBER', 
        'EMERGENCY_CONTACT_RELATIONSHIP', 'FAMILY_DOCTOR', 'DOCTOR_CONTACT', 
        'SUFFERING', 'PREGNANT_DURATION', 'HOSPITAL_PAST_2_DURATION', 
        'MEDICATION', 'SMOKE_PER_DAY', 'DENTAL_CONCERN_PROBLEMS', 'VISIT_PURPOSE', 
        'LAST_DENTAL', 'MAKE_YOU_NERVOUS', 'DENTAL_TREATMENT_REQUIREMENT', 'REFFERAL'
    ];

    foreach ($requiredFields as $field) {
        if (empty($data->$field)) {
            $errors[$field] = "$field is required.";
        }
    }

    return $errors;
}

/**
 * Function to update patient form data
 *
 * @param mysqli $conn The database connection object
 * @param object $data The request data containing updated form information
 * @return bool True if the update was successful, false otherwise
 */
function updatePatientForm($conn, $data) {
    $query = "
        UPDATE form_table SET 
            TITLE = ?, FIRST_NAME = ?, LAST_NAME = ?, OCCUPATION = ?, BIRTHDAY = ?, 
            HOME_ADDRESS = ?, CONTACT_NUMBER = ?, EMAIL_ADDRESS = ?, HEALTH_FUND = ?, 
            MEMBER_NUMBER = ?, EMERGENCY_CONTACT_NAME = ?, EMERGENCY_CONTACT_NUMBER = ?, 
            EMERGENCY_CONTACT_RELATIONSHIP = ?, FAMILY_DOCTOR = ?, DOCTOR_CONTACT = ?, 
            SUFFERING = ?, PREGNANT_DURATION = ?, HOSPITAL_PAST_2_DURATION = ?, 
            MEDICATION = ?, SMOKE_PER_DAY = ?, DENTAL_CONCERN_PROBLEMS = ?, VISIT_PURPOSE = ?, 
            LAST_DENTAL = ?, MAKE_YOU_NERVOUS = ?, DENTAL_TREATMENT_REQUIREMENT = ?, REFFERAL = ? 
        WHERE ID = ? AND PATIENT_ID = ?
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param(
        'ssssssssssssssssssssssssssss', 
        $data->TITLE, $data->FIRST_NAME, $data->LAST_NAME, $data->OCCUPATION, $data->BIRTHDAY,
        $data->HOME_ADDRESS, $data->CONTACT_NUMBER, $data->EMAIL_ADDRESS, $data->HEALTH_FUND, 
        $data->MEMBER_NUMBER, $data->EMERGENCY_CONTACT_NAME, $data->EMERGENCY_CONTACT_NUMBER, 
        $data->EMERGENCY_CONTACT_RELATIONSHIP, $data->FAMILY_DOCTOR, $data->DOCTOR_CONTACT, 
        $data->SUFFERING, $data->PREGNANT_DURATION, $data->HOSPITAL_PAST_2_DURATION, 
        $data->MEDICATION, $data->SMOKE_PER_DAY, $data->DENTAL_CONCERN_PROBLEMS, $data->VISIT_PURPOSE, 
        $data->LAST_DENTAL, $data->MAKE_YOU_NERVOUS, $data->DENTAL_TREATMENT_REQUIREMENT, 
        $data->REFFERAL, $data->ID, $data->PATIENT_ID
    );

    $success = $stmt->execute();
    $stmt->close();

    return $success;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateEditPatientFormData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Update the patient form
if (updatePatientForm($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Patient form updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update patient form."));
}

$conn->close();
?>