<?php
/**
 * Function to validate email format
 *
 * @param string $email The email to validate
 * @return array An array of errors related to the email validation
 */
function validateEmail($email)
{
    // Array to store error messages
    $errors = [];

    // Check if the email is required and is empty
    if (empty($email)) {
        $errors['EMAIL'] = "Email is required";
    } else {
        // Define the email pattern
        $emailPattern = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

        // Validate the email pattern
        if (!preg_match($emailPattern, $email)) {
            $errors['EMAIL'] = "Invalid email address";
        }
    }

    return $errors;
}
?>