# SmileHub API Documentation

This document provides an overview of the API endpoints for the SmileHub backend server, including the request and response formats.

## Base URL

The base URL for accessing the API is: http://localhost/smilehub/server

## Endpoints

### 1. Register a New User

- **Endpoints:**
  - `POST /POST/PATIENT/register.php`  
    - **Description:** Register a new patient in the system.
  - `POST /POST/STAFF/register.php`  
    - **Description:** Register a new staff member in the system.
  - `POST /POST/ADMIN/register.php`  
    - **Description:** Register a new admin in the system.

#### Request Body

```json
Note: All user role request should be sent as JSON with the following structure:
{
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "PASSWORD": "@SecurePassword123!"
}
```

#### Response

```Success (200 OK):
{
    "message": "User registered successfully."
}
```

```Error (400 Bad Request):
{
    "errors": {
        "fullname": "Full name is required.",
        "EMAIL": "Invalid email address",
        "PASSWORD": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
}
Note: The exact error messages depend on which validations fail.
```

```Error (500 Internal Server Error):
{
    "message": "Failed to register user."
}
```

### 2. Login User

- **Endpoints:**
  - `POST /POST/PATIENT/login.php`  
    - **Description:** Authenticate a patient and log them into the system.
  - `POST /POST/SHARED/login.php`  
    - **Description:** Authenticate both staff and admin and log them into the system.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "EMAIL": "johndoe@example.com",
    "PASSWORD": "@SecurePassword123!"
}
```

#### Response

```Success (200 OK):
{
    "success": true,
    "message": "Login successful",
    "user": {
        "fullname": "John Doe",
        "email": "johndoe@example.com",
        "role": "PATIENT"
    }
}
```

```Error (400 Bad Request):
{
    "success": false,
    "message": "Invalid email or password"
}
```

## Development Setup

To set up the development environment for the SmileHub API, follow these steps:

1. **Ensure you have PHP and a web server running.**

   - Install a web server such as Apache or Nginx.
   - Ensure PHP is installed and properly configured with the web server.

2. **Configure the database connection in `connection.php`.**

   - Open the `connection.php` file in your project directory.
   - Update the database connection settings with your database host, username, password, and database name.

3. **Use a tool like Postman to test API endpoints.**

   - Download and install [Postman](https://www.postman.com/downloads/).
   - Use Postman to send requests to the API endpoints and view responses.

## Error Handling

The API uses HTTP status codes to indicate the outcome of requests:

- **200 OK:** The request was successful.
- **400 Bad Request:** There was a problem with the request, such as validation errors.
- **500 Internal Server Error:** An error occurred on the server.

### Tips for Error Handling

- Ensure all request bodies are properly formatted as JSON.
- Check the API responses for error messages and status codes to debug issues.
- Validate input data before sending requests to avoid common errors.
