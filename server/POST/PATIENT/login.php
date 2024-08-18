<?php
require_once "../../connection.php";
require_once "../../cors.php";

/**
 * Function to validate login credentials
 * 
 * @param mysqli $conn The database connection object
 * @param string $email The user's email
 * @param string $password The user's password
 * @return array An array containing success status and message
 */
function login($conn, $email, $password) {
    // Array to store response
    $response = [
        'success' => false,
        'message' => ''
    ];

    // Check if the email is empty
    if (empty($email)) {
        $response['message'] = 'Email is required';
        return $response;
    }

    // Check if the password is empty
    if (empty($password)) {
        $response['message'] = 'Password is required';
        return $response;
    }

    // Prepare the query to fetch user by email
    $query = "SELECT * FROM patient_table WHERE EMAIL = ? AND ROLE = 'PATIENT'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user was found
    if ($result->num_rows === 0) {
        $response['message'] = 'Invalid email or password';
    } else {
        // Fetch the user record
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['PASSWORD'])) {
            $response['success'] = true;
            $response['message'] = 'Login successful';
            $response['user'] = [
                'fullname' => $user['FIRSTNAME'].' '.$user['LASTNAME'],
                'email' => $user['EMAIL'],
                'role' => $user['ROLE']
            ];
        } else {
            $response['message'] = 'Invalid email or password';
        }
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    return $response;
}

// Get the request data
$data = json_decode(file_get_contents("php://input"));

// Validate login credentials
$loginResponse = login($conn, $data->EMAIL, $data->PASSWORD);

// Return the response as JSON
if ($loginResponse['success']) {
    http_response_code(200);
} else {
    http_response_code(400);
}
echo json_encode($loginResponse);
?>
