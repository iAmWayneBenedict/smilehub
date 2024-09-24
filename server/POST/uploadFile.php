<?php
require_once "../connection.php";
require_once "../cors.php";

// Check if files have been uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = './../uploads/';

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
                $query = "INSERT INTO file_table (FILENAME) VALUES (?)";
                $stmt = $conn->prepare($query);
                $stmt->bind_param('s', $fileName); // Use 's' for string parameter

                if ($stmt->execute()) {
                    // Optionally handle successful insert here
                } else {
                    // Handle error in insert
                    http_response_code(500);
                    echo json_encode(array("message" => "Failed to insert filename into database."));
                    exit;
                }

                $stmt->close();
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