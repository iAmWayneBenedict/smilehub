<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data for the form
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateFormData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate TITLE
    if (empty($data->TITLE)) {
        $errors['TITLE'] = "Title is required.";
    }

    // Validate FIRST_NAME
    if (empty($data->FIRST_NAME)) {
        $errors['FIRST_NAME'] = "First name is required.";
    }

    // Validate LAST_NAME
    if (empty($data->LAST_NAME)) {
        $errors['LAST_NAME'] = "Last name is required.";
    }

    // Validate OCCUPATION
    if (empty($data->OCCUPATION)) {
        $errors['OCCUPATION'] = "Occupation is required.";
    }

    // Validate BIRTHDAY
    if (empty($data->BIRTHDAY)) {
        $errors['BIRTHDAY'] = "Birthday is required.";
    }

    // Validate HOME_ADDRESS
    if (empty($data->HOME_ADDRESS)) {
        $errors['HOME_ADDRESS'] = "Home address is required.";
    }

    // Validate CONTACT_NUMBER
    if (empty($data->CONTACT_NUMBER)) {
        $errors['CONTACT_NUMBER'] = "Contact number is required.";
    }

    // Validate EMAIL_ADDRESS
    if (empty($data->EMAIL_ADDRESS)) {
        $errors['EMAIL_ADDRESS'] = "Email address is required.";
    }

    // Validate HEALTH_FUND
    if (empty($data->HEALTH_FUND)) {
        $errors['HEALTH_FUND'] = "Health fund is required.";
    }

    // Validate MEMBER_NUMBER
    if (empty($data->MEMBER_NUMBER)) {
        $errors['MEMBER_NUMBER'] = "Member number is required.";
    }

    // Validate EMERGENCY_CONTACT_NAME
    if (empty($data->EMERGENCY_CONTACT_NAME)) {
        $errors['EMERGENCY_CONTACT_NAME'] = "Emergency contact name is required.";
    }

    // Validate EMERGENCY_CONTACT_NUMBER
    if (empty($data->EMERGENCY_CONTACT_NUMBER)) {
        $errors['EMERGENCY_CONTACT_NUMBER'] = "Emergency contact number is required.";
    }

    // Validate EMERGENCY_CONTACT_RELATIONSHIP
    if (empty($data->EMERGENCY_CONTACT_RELATIONSHIP)) {
        $errors['EMERGENCY_CONTACT_RELATIONSHIP'] = "Emergency contact relationship is required.";
    }

    // Validate FAMILY_DOCTOR
    if (empty($data->FAMILY_DOCTOR)) {
        $errors['FAMILY_DOCTOR'] = "Family doctor is required.";
    }

    // Validate DOCTOR_CONTACT
    if (empty($data->DOCTOR_CONTACT)) {
        $errors['DOCTOR_CONTACT'] = "Doctor contact is required.";
    }

    // Validate SUFFERING
    if (empty($data->SUFFERING)) {
        $errors['SUFFERING'] = "Suffering information is required.";
    }

    // Validate PREGNANT_DURATION
    if (empty($data->PREGNANT_DURATION)) {
        $errors['PREGNANT_DURATION'] = "Pregnant duration is required.";
    }

    // Validate HOSPITAL_PAST_2_DURATION
    if (empty($data->HOSPITAL_PAST_2_DURATION)) {
        $errors['HOSPITAL_PAST_2_DURATION'] = "Hospital past 2 duration is required.";
    }

    // Validate MEDICATION
    if (empty($data->MEDICATION)) {
        $errors['MEDICATION'] = "Medication information is required.";
    }

    // Validate SMOKE_PER_DAY
    if (empty($data->SMOKE_PER_DAY)) {
        $errors['SMOKE_PER_DAY'] = "Smoke per day information is required.";
    }

    // Validate DENTAL_CONCERN_PROBLEMS
    if (empty($data->DENTAL_CONCERN_PROBLEMS)) {
        $errors['DENTAL_CONCERN_PROBLEMS'] = "Dental concern problems are required.";
    }

    // Validate VISIT_PURPOSE
    if (empty($data->VISIT_PURPOSE)) {
        $errors['VISIT_PURPOSE'] = "Visit purpose is required.";
    }

    // Validate LAST_DENTAL
    if (empty($data->LAST_DENTAL)) {
        $errors['LAST_DENTAL'] = "Last dental visit is required.";
    }

    // Validate MAKE_YOU_NERVOUS
    if (empty($data->MAKE_YOU_NERVOUS)) {
        $errors['MAKE_YOU_NERVOUS'] = "Make you nervous information is required.";
    }

    // Validate DENTAL_TREATMENT_REQUIREMENT
    if (empty($data->DENTAL_TREATMENT_REQUIREMENT)) {
        $errors['DENTAL_TREATMENT_REQUIREMENT'] = "Dental treatment requirement is required.";
    }

    // Validate REFFERAL
    if (empty($data->REFFERAL)) {
        $errors['REFFERAL'] = "Referral information is required.";
    }

    return $errors;
}

/**
 * Function to insert a form record
 *
 * @param mysqli $conn The database connection object
 * @param object $data The form data to insert
 * @return bool True if insert was successful, otherwise false
 */
function insertForm($conn, $data) {
    $query = "INSERT INTO form_table (PATIENT_ID, TITLE, FIRST_NAME, LAST_NAME, OCCUPATION, BIRTHDAY, HOME_ADDRESS, CONTACT_NUMBER, EMAIL_ADDRESS, HEALTH_FUND, MEMBER_NUMBER, EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT_NUMBER, EMERGENCY_CONTACT_RELATIONSHIP, FAMILY_DOCTOR, DOCTOR_CONTACT, SUFFERING, PREGNANT_DURATION, HOSPITAL_PAST_2_DURATION, MEDICATION, SMOKE_PER_DAY, DENTAL_CONCERN_PROBLEMS, VISIT_PURPOSE, LAST_DENTAL, MAKE_YOU_NERVOUS, DENTAL_TREATMENT_REQUIREMENT, REFFERAL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssssssssssssssssssssssssss', 
        $data->PATIENT_ID, 
        $data->TITLE, 
        $data->FIRST_NAME, 
        $data->LAST_NAME, 
        $data->OCCUPATION, 
        $data->BIRTHDAY, 
        $data->HOME_ADDRESS, 
        $data->CONTACT_NUMBER, 
        $data->EMAIL_ADDRESS, 
        $data->HEALTH_FUND, 
        $data->MEMBER_NUMBER, 
        $data->EMERGENCY_CONTACT_NAME, 
        $data->EMERGENCY_CONTACT_NUMBER, 
        $data->EMERGENCY_CONTACT_RELATIONSHIP, 
        $data->FAMILY_DOCTOR, 
        $data->DOCTOR_CONTACT, 
        $data->SUFFERING, 
        $data->PREGNANT_DURATION, 
        $data->HOSPITAL_PAST_2_DURATION, 
        $data->MEDICATION, 
        $data->SMOKE_PER_DAY, 
        $data->DENTAL_CONCERN_PROBLEMS, 
        $data->VISIT_PURPOSE, 
        $data->LAST_DENTAL, 
        $data->MAKE_YOU_NERVOUS, 
        $data->DENTAL_TREATMENT_REQUIREMENT, 
        $data->REFFERAL
    );

    return $stmt->execute();
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateFormData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Insert the form record
if (insertForm($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Form record added successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to add form record."));
}

$conn->close();
?>
