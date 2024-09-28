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

    // Validate ID
    if (empty($data->ID)) {
        $errors['ID'] = "ID is required.";
    }

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
 * Function to check if a progress record exists for the given ID and PATIENT_ID
 *
 * @param mysqli $conn The database connection object
 * @param string $id The ID of the progress note
 * @param string $patientId The PATIENT_ID of the progress note
 * @return bool True if the record exists, false otherwise
 */
function recordExists($conn, $id, $patientId) {
    $query = "SELECT COUNT(*) FROM progress_table WHERE ID = ? AND PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $id, $patientId);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    return $count > 0;
}


/**
 * Function to update a progress record in the progress_table
 *
 * @param mysqli $conn The database connection object
 * @param object $data The progress data to update
 * @param string|null $xRayFileName The uploaded X-ray file name
 * @param string|null $signatureFileName The uploaded signature file name
 * @return bool True if the update was successful, false otherwise
 */
function updateProgress($conn, $data, $xRayFileName, $signatureFileName) {
    // Update query to include optional X-ray and signature file names
    $query = "UPDATE progress_table SET 
                COMPLAINT = ?, 
                HISTORY_UPDATE = ?, 
                DIAGNOSIS = ?, 
                TREATMENT_PLAN = ?, 
                PROCEDURES = ?, 
                MATERIALS_USED = ?, 
                INSTRUCTION = ?, 
                RESPONSE = ?, 
                DATE = ?,
                X_RAY_FILE = COALESCE(?, X_RAY_FILE),
                SIGNATURE = COALESCE(?, SIGNATURE)
              WHERE ID = ? AND PATIENT_ID = ?";
              
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sssssssssssss', 
        $data->COMPLAINT, 
        $data->HISTORY_UPDATE, 
        $data->DIAGNOSIS, 
        $data->TREATMENT_PLAN, 
        $data->PROCEDURES, 
        $data->MATERIALS_USED, 
        $data->INSTRUCTION, 
        $data->RESPONSE, 
        $data->DATE,
        $xRayFileName,
        $signatureFileName,
        $data->ID,
        $data->PATIENT_ID
    );
    
    return $stmt->execute();
}

/**
 * Function to get the existing files for a progress note
 *
 * @param mysqli $conn The database connection object
 * @param string $id The ID of the progress note
 * @param string $patientId The PATIENT_ID of the progress note
 * @return array An associative array containing the current X-ray and signature file names
 */
function getCurrentFiles($conn, $id, $patientId) {
    $query = "SELECT X_RAY_FILE, SIGNATURE FROM progress_table WHERE ID = ? AND PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $id, $patientId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
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

// Check if the record exists
if (!recordExists($conn, $data->ID, $data->PATIENT_ID)) {
    http_response_code(404);
    echo json_encode(array("message" => "Record not found for the provided ID and PATIENT_ID."));
    exit;
}

// Get current files to delete old ones if necessary
$currentFiles = getCurrentFiles($conn, $data->ID, $data->PATIENT_ID);
$oldXRayFile = $currentFiles['X_RAY_FILE'];
$oldSignatureFile = $currentFiles['SIGNATURE'];

// Initialize file names
$xRayFileName = null;
$signatureFileName = null;

// Check for X-RAY file upload
if (isset($_FILES['X_RAY_FILE'])) {
    if ($_FILES['X_RAY_FILE']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../uploads/';
        $file = $_FILES['X_RAY_FILE'];
        $xRayFileName = md5(uniqid()) . '_' . basename($file['name']);
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $xRayFileName)) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to move uploaded X-ray file."));
            exit;
        }
    } elseif ($_FILES['X_RAY_FILE']['error'] !== UPLOAD_ERR_NO_FILE) {
        // Handle other upload errors
        http_response_code(500);
        echo json_encode(array("message" => "Error uploading X-ray file."));
        exit;
    }
}

// Check for SIGNATURE file upload
if (isset($_FILES['SIGNATURE'])) {
    if ($_FILES['SIGNATURE']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../uploads/';
        $file = $_FILES['SIGNATURE'];
        $signatureFileName = md5(uniqid()) . '_' . basename($file['name']);
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $signatureFileName)) {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to move uploaded signature file."));
            exit;
        }
    } elseif ($_FILES['SIGNATURE']['error'] !== UPLOAD_ERR_NO_FILE) {
        // Handle other upload errors
        http_response_code(500);
        echo json_encode(array("message" => "Error uploading signature file."));
        exit;
    }
}

// Delete old files if new files are provided
if ($xRayFileName && file_exists('../../uploads/' . $oldXRayFile)) {
    unlink('../../uploads/' . $oldXRayFile);
}

if ($signatureFileName && file_exists('../../uploads/' . $oldSignatureFile)) {
    unlink('../../uploads/' . $oldSignatureFile);
}

// Attempt to update the progress record
if (updateProgress($conn, $data, $xRayFileName, $signatureFileName)) {
    http_response_code(200);
    echo json_encode(array("message" => "Progress record updated successfully."));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update progress record."));
}

$conn->close();
?>
