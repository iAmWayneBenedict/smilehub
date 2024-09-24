<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data for editing
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateEditAssessmentData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate TOOTH_NO
    if (empty($data->TOOTH_NO)) {
        $errors['TOOTH_NO'] = "Tooth number is required.";
    }

    // Validate COLOR
    if (empty($data->COLOR)) {
        $errors['COLOR'] = "Color is required.";
    }

    // Validate TEXTURE
    if (empty($data->TEXTURE)) {
        $errors['TEXTURE'] = "Texture is required.";
    }

    // Validate GUM_HEALTH
    if (empty($data->GUM_HEALTH)) {
        $errors['GUM_HEALTH'] = "Gum health is required.";
    }

    // Validate PRESENCE_OF_DECAY
    if (!in_array($data->PRESENCE_OF_DECAY, ['yes', 'no', ''])) {
        $errors['PRESENCE_OF_DECAY'] = "Invalid value for Presence of decay. Allowed values are 'yes', 'no', or blank.";
    }

    // Validate CAVITIES
    if (!in_array($data->CAVITIES, ['yes', 'no', ''])) {
        $errors['CAVITIES'] = "Invalid value for Cavities. Allowed values are 'yes', 'no', or blank.";
    }

    // Validate SENSITIVITY
    if (!in_array($data->SENSITIVITY, ['yes', 'no', ''])) {
        $errors['SENSITIVITY'] = "Invalid value for Sensitivity. Allowed values are 'yes', 'no', or blank.";
    }

    // Validate MOBILITY
    if (empty($data->MOBILITY)) {
        $errors['MOBILITY'] = "Mobility is required.";
    }

    // Validate PREVIOUS_TREATMENT
    if (empty($data->PREVIOUS_TREATMENT)) {
        $errors['PREVIOUS_TREATMENT'] = "Previous treatment is required.";
    }

    return $errors;
}

/**
 * Function to check if an assessment record exists
 *
 * @param mysqli $conn The database connection object
 * @param object $data The assessment data to check
 * @return bool True if the record exists, otherwise false
 */
function recordExists($conn, $data) {
    $query = "SELECT COUNT(*) FROM assessment_table WHERE PATIENT_ID = ? AND TOOTH_NO = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $data->PATIENT_ID, $data->TOOTH_NO);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    return $count > 0;
}

/**
 * Function to update an assessment record
 *
 * @param mysqli $conn The database connection object
 * @param object $data The assessment data to update
 * @return bool True if update was successful, otherwise false
 */
function updateAssessment($conn, $data) {
    $query = "UPDATE assessment_table SET 
                COLOR = ?, 
                TEXTURE = ?, 
                GUM_HEALTH = ?, 
                PRESENCE_OF_DECAY = ?, 
                CAVITIES = ?, 
                SENSITIVITY = ?, 
                MOBILITY = ?, 
                PREVIOUS_TREATMENT = ? 
              WHERE PATIENT_ID = ? AND TOOTH_NO = ?";
    
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        return false; // Return false if preparation failed
    }

    // Bind parameters
    $stmt->bind_param('ssssssiiii', 
        $data->COLOR, 
        $data->TEXTURE, 
        $data->GUM_HEALTH, 
        $data->PRESENCE_OF_DECAY, 
        $data->CAVITIES, 
        $data->SENSITIVITY, 
        $data->MOBILITY, 
        $data->PREVIOUS_TREATMENT, 
        $data->PATIENT_ID, 
        $data->TOOTH_NO
    );

    return $stmt->execute(); // Return the execution result
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate the request data
$validationErrors = validateEditAssessmentData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if the assessment record exists
if (!recordExists($conn, $data)) {
    http_response_code(404);
    echo json_encode(array("message" => "No assessment found with the provided Patient ID and Tooth Number."));
    exit;
}

// Update the assessment record
if (updateAssessment($conn, $data)) {
    http_response_code(200);
    echo json_encode(array("message" => "Assessment record updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update assessment record."));
}

$conn->close();
?>
