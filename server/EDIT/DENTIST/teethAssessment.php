<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate the request data
 *
 * @param object $data The request data to validate
 * @return array An array of errors if any validation fails
 */
function validateAssessmentData($data) {
    $errors = [];

    // Validate PATIENT_ID
    if (empty($data->PATIENT_ID)) {
        $errors['PATIENT_ID'] = "Patient ID is required.";
    }
    return $errors;
}

/**
 * Function to get the current file name from the database
 *
 * @param mysqli $conn The database connection object
 * @param string $patientId The patient ID
 * @return string|null The file name if found, otherwise null
 */
function getCurrentFileName($conn, $patientId) {
    $query = "SELECT FILENAME FROM file_assessment_table WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $patientId);
    $stmt->execute();
    $stmt->bind_result($fileName);
    if ($stmt->fetch()) {
        return $fileName;
    }
    return null;
}

/**
 * Function to update the assessment record
 *
 * @param mysqli $conn The database connection object
 * @param string $fileName The new file name
 * @param string $patientId The patient ID
 * @return bool True if the update was successful, otherwise false
 */
function updateAssessment($conn, $fileName, $patientId) {
    $query = "UPDATE file_assessment_table SET FILENAME = ? WHERE PATIENT_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $fileName, $patientId);
    
    return $stmt->execute();
}

// Get the request data
$data = (object) $_POST;

// Validate the request data
$validationErrors = validateAssessmentData($data);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(array("errors" => $validationErrors));
    exit;
}

// Check if files have been uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = '../../uploads/';

    // Get the current file associated with the patient ID
    $currentFileName = getCurrentFileName($conn, $data->PATIENT_ID);
    if ($currentFileName) {
        // Delete the old file from the server
        $oldFilePath = $uploadDir . $currentFileName;
        if (file_exists($oldFilePath)) {
            unlink($oldFilePath);
        }
    }

    // Check if a new file has been uploaded
    if (isset($_FILES['file1']) && $_FILES['file1']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file1'];

        // Set the new file name
        $originalFileName = basename($file['name']);
        $fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);
        $newFileName = md5(uniqid()) . '.' . $fileExtension; // Unique filename
        $newFilePath = $uploadDir . $newFileName;

        // Move the new file to the destination folder
        if (move_uploaded_file($file['tmp_name'], $newFilePath)) {
            // Update the database record with the new file name
            if (updateAssessment($conn, $newFileName, $data->PATIENT_ID)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "File updated successfully.",
                    "fileName" => $newFileName
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to update file in the database."));
            }
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to upload the new file."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "No file uploaded or file upload error occurred."));
    }
}

$conn->close();
?>