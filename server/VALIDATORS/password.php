<?php
/**
 * Function to validate password strength
 *
 * @param string $password The password to validate
 * @return array An array of errors related to the password validation
 */
function validatePassword($password)
{
    // Array to store error messages
    $errors = [];

    // Check if the password is required and is empty
    if (empty($password)) {
        $errors['PASSWORD'] = "Password is required";
    } else {
        // Define the password pattern
        $passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';

        // Validate the password pattern
        if (!preg_match($passwordPattern, $password)) {
            $errors['PASSWORD'] = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
    }

    return $errors;
}
?>