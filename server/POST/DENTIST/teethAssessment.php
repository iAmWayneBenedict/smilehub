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
 * Function to insert an assessment record
 *
 * @param mysqli $conn The database connection object
 * @param object $data The assessment data to insert
 * @return bool True if insert was successful, otherwise false
 */
function insertAssessment($conn, $data, $fileName) {
    $query = "INSERT INTO file_assessment_table (PATIENT_ID, FILENAME) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $data->PATIENT_ID, $fileName); // Use 's' for string parameter
    
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

    $filesUploaded = 0;
    $uploadedFiles = array_fill(0, 1, ""); // Change the range if you are uploading multiple files

    // Loop through each file - [Change the range if you are uploading multiple files]
    for ($i = 1; $i <= 1; $i++) {
        $fileKey = 'file' . $i;

        // Check if a file has been uploaded
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES[$fileKey];

            // Set the file name
            $originalFileName = basename($file['name']);
            $fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);
            $fileName = md5(uniqid()) . '_' . $i . '.' . $fileExtension; // Unique filename
            $filePath = $uploadDir . $fileName;

            // Move the uploaded file to the destination folder
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                $filesUploaded++;
                $uploadedFiles[$i - 1] = $fileName;

                // Insert the filename into the database
                if (insertAssessment($conn, $data, $fileName)) {
                    // Optionally handle successful insert here
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Failed to insert filename into database."));
                    exit;
                }
            }
        }
    }

    if ($filesUploaded > 0) {
        http_response_code(200);
        echo json_encode(array(
            "message" => "Files uploaded successfully.",
            "fileName" => $uploadedFiles
        ));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "No file uploaded or file upload error occurred"));
    }
}

$conn->close();
?>