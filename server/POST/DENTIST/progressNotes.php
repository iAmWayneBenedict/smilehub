<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateProgressData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }

    // Validate COMPLAINT
    if (empty($data->COMPLAINT)) {
        $errors['COMPLAINT'] = "Complaint is required.";
    }

    // Validate HISTORY_UPDATE
    if (empty($data->HISTORY_UPDATE)) {
        $errors['HISTORY_UPDATE'] = "History update is required.";
    }

    // Validate DIAGNOSIS
    if (empty($data->DIAGNOSIS)) {
        $errors['DIAGNOSIS'] = "DIAGNOSIS is required.";
    }

    // Validate TREATMENT_PLAN
    if (empty($data->TREATMENT_PLAN)) {
        $errors['TREATMENT_PLAN'] = "TREATMENT_PLAN is required.";
    }

    // Validate PROCEDURES
    if (empty($data->PROCEDURES)) {
        $errors['PROCEDURES'] = "PROCEDURES is required.";
    }

    // Validate MATERIALS_USED
    if (empty($data->MATERIALS_USED)) {
        $errors['MATERIALS_USED'] = "MATERIALS_USED is required.";
    }

    // Validate INSTRUCTION
    if (empty($data->INSTRUCTION)) {
        $errors['INSTRUCTION'] = "INSTRUCTION is required.";
    }

    // Validate RESPONSE
    if (empty($data->RESPONSE)) {
        $errors['RESPONSE'] = "RESPONSE is required.";
    }

    // Validate DATE
    if (empty($data->DATE)) {
        $errors['DATE'] = "DATE is required.";
    }

    return $errors;
}

/**
 * Function to insert a progress record into the progress_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The progress data to insert
 * @param string $xRayFileName The uploaded X-ray file name
 * @param string $signatureFileName The uploaded signature file name
 * @return bool True if the insert was successful, false otherwise
 */
function insertProgress($conn, $data, $xRayFileName, $signatureFileName) {
    $query = "INSERT INTO progress_table (PATIENT_ID, COMPLAINT, HISTORY_UPDATE, X_RAY_FILE, DIAGNOSIS, TREATMENT_PLAN, PROCEDURES, MATERIALS_USED, INSTRUCTION, RESPONSE, SIGNATURE, DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssssssssss', 
        $data->PATIENT_ID, 
        $data->COMPLAINT, 
        $data->HISTORY_UPDATE, 
        $xRayFileName, 
        $data->DIAGNOSIS, 
        $data->TREATMENT_PLAN, 
        $data->PROCEDURES, 
        $data->MATERIALS_USED, 
        $data->INSTRUCTION, 
        $data->RESPONSE, 
        $signatureFileName, 
        $data->DATE
    );
    
    return $stmt->execute();
}

// Get the request data
$data = (object) $_POST;

// Validate the request data
$validationErrors = validateProgressData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if files have been uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = '../../uploads/';
    $xRayFileName = '';
    $signatureFileName = '';
 
    // Check for X-RAY file upload
    if (isset($_FILES['X_RAY_FILE']) && $_FILES['X_RAY_FILE']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['X_RAY_FILE'];
        $xRayFileName = md5(uniqid()) . '_' . basename($file['name']);
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $xRayFileName)) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to move uploaded X-ray file."));
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "No file found for X_RAY_FILE"));
        exit;
    }
    
    // Check for SIGNATURE file upload
    if (isset($_FILES['SIGNATURE']) && $_FILES['SIGNATURE']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['SIGNATURE'];
        $signatureFileName = md5(uniqid()) . '_' . basename($file['name']);
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $signatureFileName)) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to move uploaded signature file."));
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "No file found for SIGNATURE"));
        exit;
    }

    // Attempt to insert the progress record
    if (insertProgress($conn, $data, $xRayFileName, $signatureFileName)) {
        http_response_code(200);
        echo json_encode(array("message" => "Progress record added successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to add progress record."));
    }
}

$conn->close();
?>