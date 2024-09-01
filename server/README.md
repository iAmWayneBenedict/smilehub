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
Note: Request body for Patient
{
    "FIRSTNAME": "John",
    "LASTNAME": "Doe",
    "BIRTHDATE": "1990-01-01",
    "PHONE": "123-456-7890",
    "EMAIL": "johndoe@example.com",
    "PASSWORD": "@SecurePassword123!"
}
```

```json
Note: Request body for Staff and admin account
{
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "PASSWORD": "@SecurePassword123!"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "User registered successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "fullname": "Full name is required.",
        "EMAIL": "Invalid email address",
        "PASSWORD": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "Email already exists."
}
```

```json
Error (500 Internal Server Error):
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

```json
Success (200 OK):
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

```json
Error (400 Bad Request):
{
    "success": false,
    "message": "Invalid email or password"
}
```

### 3. Fetch Available Appointment Times

- **Endpoints:**
  - `GET /GET/SHARED/APPOINTMENT/availableTime.php`  
    - **Description:** Retrieve available appointment times for a specific date.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "APPOINTMENT_DATE": "2024-08-04"
}
```

#### Response

```json
Success (200 OK):
{
    "available_times": [
        "8:00 AM - 9:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM",
        "5:00 PM - 6:00 PM"
    ]
}
```

```json
Error (400 Bad Request):
{
    "error": "Appointment date is required."
}
```

```json
Error (404 Not Found):
{
    "message": "No available times for the selected date."
}
```

### 4. Create an Appointment

- **Endpoints:**
  - `POST /POST/PATIENT/appointment.php`  
    - **Description:** Create a new appointment for a user (This route is for patients account only).
  - `POST /POST/SHARED/appointment.php`  
    - **Description:** Create a new appointment for a user (This route is for staff and admin account only).

#### Request Body

The request should be sent as JSON with the following structure:

```json
Note: Request body for patients account
{
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "PHONE": "123-456-7890",
    "APPOINTMENT_DATE": "2024-08-04",
    "APPOINTMENT_TIME": "9:00 AM - 10:00 AM",
    "PURPOSE": "Dental Bonding"
}
```

```json
Note: Request body for staff or admin account
{
    "PATIENT_ID": "123",
    "APPOINTMENT_DATE": "2024-08-04",
    "APPOINTMENT_TIME": "9:00 AM - 10:00 AM",
    "PURPOSE": "Dental Bonding"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Appointment created successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "FULLNAME": "Full name is required.",
        "EMAIL": "Email is required.",
        "PHONE": "Phone number is required.",
        "APPOINTMENT_DATE": "Appointment date is required.",
        "APPOINTMENT_TIME": "Appointment time is required.",
        "PURPOSE": "Purpose is required."
    }
}
```

```json
Error (400 Bad Request):
{
    "message": "You already have a pending appointment from us."
}
```

```json
Error (400 Bad Request):
{
    "message": "The date and time you've selected is booked already."
}
```

```json
Note: This error can occur only in staff or admin account
Error (400 Not Found):
{
    "message": "Patient not found."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to create an appointment."
}
```

### 5. Fetch All Appointments

- **Endpoints:**
  - `GET /GET/SHARED/APPOINTMENT/appointments.php`  
    - **Description:** Retrieve a list of all appointments.
- **Query Parameters:**
  - `GET /GET/SHARED/APPOINTMENT/appointments.php?status=Completed`  
    - **status (Optional):** Filter appointments by their status (e.g., Pending, Completed). If this parameter is not provided, all appointments will be retrieved.   

- **Note:**
  - When the status parameter is provided, only appointments that match the specified status will be returned.

#### Response

```json
Success (200 OK):
[
    {
        "ID": "1",
        "FULLNAME": "Juan Dela Cruz",
        "EMAIL": "juan@gmail.com",
        "PHONE": "9396164115",
        "APPOINTMENT_DATE": "2024-08-15",
        "APPOINTMENT_TIME": "8:00 AM - 9:00 AM",
        "PURPOSE": "Dental Bonding",
        "STATUS": "Pending"
    },
    {
        "ID": "2",
        "FULLNAME": "John Doe",
        "EMAIL": "john@gmail.com",
        "PHONE": "9396164116",
        "APPOINTMENT_DATE": "2024-08-15",
        "APPOINTMENT_TIME": "9:00 AM - 10:00 AM",
        "PURPOSE": "Dental Bonding",
        "STATUS": "On-going"
    }
]
```

```json
Error (404 Not Found):
{
    "message": "No available appointment."
}
```

### 6. Reschedule an Appointment

- **Endpoints:**
  - `POST /EDIT/SHARED/APPOINTMENT/reschedule.php`  
    - **Description:** Allows a staff or admin to reschedule an appointment by providing the new appointment date and time based on the appointment ID.

- **Note:**
  - Only appointments with a status of Pending can be rescheduled.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 1,
    "APPOINTMENT_DATE": "2024-09-01",
    "APPOINTMENT_TIME": "10:00 AM - 11:00 AM"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Appointment rescheduled successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Appointment ID is required.",
        "APPOINTMENT_DATE": "New appointment date is required.",
        "APPOINTMENT_TIME": "New appointment time is required."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "You can only reschedule a pending appointment."
}
```

```json
Error (400 Bad Request):
{
    "message": "The new date and time you've selected is already booked."
}
```

```json
Error (404 Not Found):
{
    "message": "Appointment not found."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to reschedule the appointment."
}
```

### 7. Update Appointment Status

- **Endpoints:**
  - `POST /EDIT/SHARED/APPOINTMENT/changeStatus.php`  
    - **Description:** Allows a user to update the status of an appointment by providing the appointment ID and the new status.

- **Note:**
  - Only appointments with a status of Pending can be rescheduled.

#### Request Body

```json
Note: Allowed values for status are "Pending", "On-going", "Completed", "Cancelled".
{
    "ID": 1,
    "STATUS": "Completed"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Appointment status updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Appointment ID is required.",
        "STATUS": "Status is required."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "errors": {
        "STATUS": "Invalid status value."
    }
}
```

```json
Error (404 Not Found):
{
    "message": "Appointment not found."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update appointment status."
}
```

### 8. Remove an Appointment

- **Endpoints:**
  - `POST /DELETE/SHARED/APPOINTMENT/appointment.php`  
    - **Description:** Allows a user to delete an appointment by providing the appointment ID.

#### Request Body

```json
{
    "ID": 1
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Appointment deleted successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Appointment ID is required."
    }
}
```

```json
Error (404 Not Found):
{
    "message": "Appointment not found."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to delete the appointment."
}
```

### 9. Fetch Appointments by Date

- **Endpoints:**
  - `GET /GET/SHARED/APPOINTMENT/appointmentsByDate.php`  
    - **Description:** Retrieves all appointments scheduled for a specific date.

#### Request Body

```json
{
    "APPOINTMENT_DATE": "2024-08-15"
}
```

#### Response

```json
Success (200 OK):
[
    {
        "ID": "1",
        "FULLNAME": "Juan Dela Cruz",
        "EMAIL": "juan@gmail.com",
        "PHONE": "9396164115",
        "APPOINTMENT_DATE": "2024-08-15",
        "APPOINTMENT_TIME": "8:00 AM - 9:00 AM",
        "PURPOSE": "Dental Bonding",
        "STATUS": "Pending"
    },
    {
        "ID": "2",
        "FULLNAME": "John Doe",
        "EMAIL": "john@gmail.com",
        "PHONE": "9396164116",
        "APPOINTMENT_DATE": "2024-08-15",
        "APPOINTMENT_TIME": "9:00 AM - 10:00 AM",
        "PURPOSE": "Dental Bonding",
        "STATUS": "On-going"
    }
]
```

```json
Error (400 Bad Request):
{
    "errors": {
        "APPOINTMENT_DATE": "Appointment date is required."
    }
}
```

```json
Error (404 Not Found):
{
    "message": "No appointments found for the given date."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to fetch appointments."
}
```

### 10. Fetch All Patients

- **Endpoints:**
  - `GET /GET/SHARED/PATIENT/patients.php`  
    - **Description:** Retrieve a list of all patients, including their full names, roles and IDs.

#### Response

```json
Success (200 OK):
[
    {
        "ID": "10",
        "FULLNAME": "Juan Dela Cruz",
        "ROLE": "PATIENT"
    },
    {
        "ID": "11",
        "FULLNAME": "Jane Doe",
        "ROLE": "ARCHIVE"
    }
]
```

```json
Error (404 Not Found):
{
    "message": "No patients found."
}
```

### 11. Add New Patient

- **Endpoints:**
  - `POST /POST/SHARED/patient.php`  
    - **Description:** Register a new patient in the system (This is for staff and admin account only).

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "FIRSTNAME": "John",
    "LASTNAME": "Doe",
    "BIRTHDATE": "1990-01-01",
    "GENDER": "Male",
    "PHONE": "1234567890",
    "EMAIL": "john.doe@example.com"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "User registered successfully.",
    "email": "john.doe@example.com",
    "generated_password": "BUJAiZO283"
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "fullname": "Full name is required.",
        "EMAIL": "Invalid email address",
        "PASSWORD": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "Email already exists."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to register user."
}
```

### 12. Fetch Patient Details by ID

- **Endpoints:**
  - `GET /GET/SHARED/PATIENT/patient.php`  
    - **Description:** Retrieve details of a specific patient by their ID.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 15
}
```

#### Response

```json
Success (200 OK):
{
    "ID": 15,
    "FIRSTNAME": "John",
    "LASTNAME": "Doe",
    "BIRTHDATE": "1990-01-01",
    "GENDER": "Male",
    "PHONE": "1234567890",
    "EMAIL": "john.doe@example.com",
    "ROLE": "PATIENT"
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Patient ID is required."
    }
}
```

```json
Error (404 Not Found):
{
    "message": "Patient not found."
}
```

### 13. Update Patient Account Status

- **Endpoints:**
  - `POST /EDIT/SHARED/PATIENT/changeStatus.php`  
    - **Description:** Update the account status of a patient based on their ID.

#### Request Body

The request should be sent as JSON with the following structure:

```json
Note: Allowed values for ROLE are "PATIENT", "ARCHIVE", Uppercase is necessary.
{
    "ID": 15,
    "ROLE": "ARCHIVE"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Patient account status updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Patient ID is required.",
        "ROLE": "Role is required."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update patient account status. Please check the patient ID."
}
```

### 14. Update Patient Information

- **Endpoints:**
  - `POST /EDIT/SHARED/PATIENT/patient.php`  
    - **Description:** Update a patient's information, including their first name, last name, birthdate, gender, phone number, and email.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 15,
    "FIRSTNAME": "John",
    "LASTNAME": "Doe",
    "BIRTHDATE": "1990-01-01",
    "GENDER": "Male",
    "PHONE": "1234567890",
    "EMAIL": "john.doe@example.com"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Patient information updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Patient ID is required.",
        "FIRSTNAME": "First name is required.",
        "LASTNAME": "Last name is required.",
        "BIRTHDATE": "Date of birth is required.",
        "GENDER": "Gender is required.",
        "PHONE": "Phone number is required.",
        "EMAIL": "Invalid email address."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "Email already exists."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update patient information."
}
```

### 15. Fetch Appointments and Patient Data

- **Endpoints:**
  - `GET /GET/SHARED/PATIENT/patientsWithAppointment.php`  
    - **Description:** Retrieve a list of all patients along with their appointment details. This includes the last and next appointments, diagnosis, and status. If a patient has no appointments, they will still be listed with null values for the appointment details.

#### Response

```json
Success (200 OK):
{
    "patients": [
        {
            "ID": "29",
            "FULLNAME": "John Doe",
            "Last_Appointment": null,
            "Next_Appointment": "2024-08-20",
            "DIAGNOSIS": "Dentures",
            "STATUS": "Pending"
        },
        {
            "ID": "10",
            "FULLNAME": "Juan Dela Cruz",
            "Last_Appointment": "2024-08-11",
            "Next_Appointment": "2024-08-19",
            "DIAGNOSIS": "Cleaning",
            "STATUS": "Completed"
        },
        {
            "ID": "11",
            "FULLNAME": "Jane Doe",
            "Last_Appointment": null,
            "Next_Appointment": null,
            "DIAGNOSIS": null,
            "STATUS": null
        }
    ]
}
```

```json
Error (404 Not Found):
{
    "message": "No data found."
}
```

### 16. Add New Dentist

- **Endpoints:**
  - `POST /POST/ADMIN/dentist.php`  
    - **Description:** Add a new dentist in the system (This is for admin account only).

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "BIRTHDAY": "1990-01-01",
    "GENDER": "Male",
    "PASSWORD": "SecurePass123!"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "User registered successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "fullname": "Full name is required.",
        "EMAIL": "Invalid email address",
        "PASSWORD": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "Email already exists."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to register user."
}
```

### 17. Fetch Dentist Details by ID

- **Endpoints:**
  - `GET /GET/SHARED/DENTIST/dentist.php`  
    - **Description:** Retrieve details of a specific dentist by their ID.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 16
}
```

#### Response

```json
Success (200 OK):
{
    "ID": 16,
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "BIRTHDAY": "Male",
    "GENDER": "1990-01-01",
    "ROLE": "ADMIN"
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Dentist ID is required."
    }
}
```

```json
Error (404 Not Found):
{
    "message": "Dentist not found."
}
```

### 18. Fetch All Dentist and Staff

- **Endpoints:**
  - `GET /GET/SHARED/EMPLOYEE/employees.php`  
    - **Description:** Retrieve a list of all employees, including their full names, IDs, email, birthday, gender, role and date account added.

#### Response

```json
Success (200 OK):
[
    {
        "ID": "13",
        "FULLNAME": "admin account",
        "EMAIL": "admin@gmail.com",
        "BIRTHDAY": "",
        "GENDER": "",
        "ROLE": "ADMIN",
        "DATETIME": "2024-08-04 17:52:05"
    },
    {
        "ID": "18",
        "FULLNAME": "Staff Sample",
        "EMAIL": "staff@gmail.com",
        "BIRTHDAY": "",
        "GENDER": "",
        "ROLE": "STAFF",
        "DATETIME": "2024-09-01 12:05:01"
    }
]
```

```json
Error (404 Not Found):
{
    "message": "No dentists found."
}
```


### 19. Update Dentist Information

- **Endpoints:**
  - `POST /EDIT/SHARED/DENTIST/dentist.php`  
    - **Description:** Update a dentist information, including their full name, email, birthday and gender.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 16,
    "FULLNAME": "John Doe",
    "EMAIL": "johndoe@example.com",
    "BIRTHDAY": "1985-05-15",
    "GENDER": "Male"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Dentist information updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Dentist ID is required.",
        "fullname": "Full name is required.",
        "EMAIL": "Email is required"
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "message": "Email already exists."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update dentist information."
}
```

### 20. Update Dentist and Staff Password

- **Endpoints:**
  - `POST /EDIT/SHARED/PASSWORD/password.php`  
    - **Description:** Change password for Dentist and Staff Account.

#### Request Body

The request should be sent as JSON with the following structure:

```json
{
    "ID": 16,
    "PREVIOUS_PASSWORD": "OldPassword123!",
    "NEW_PASSWORD": "NewSecurePassword456!"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Password updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Employee ID is required.",
        "PREVIOUS_PASSWORD": "Previous password is required.",
        "PASSWORD": "Password is required"
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (400 Bad Request):
{
    "errors": {
        "NEW_PASSWORD": "Password must be at least 8 characters long."
    }
}
```

```json
Error (400 Bad Request):
{
    "message": "Previous password is incorrect."
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update password."
}
```

### 21. Update Dentist and Staff Account Status

- **Endpoints:**
  - `POST /EDIT/SHARED/EMPLOYEE/changeStatus.php`  
    - **Description:** Update the account status of dentist and staff based on their ID.

#### Request Body

The request should be sent as JSON with the following structure:

```json
Note: Allowed values for STATUS are "ACTIVE", "ARCHIVE", Uppercase is necessary.
{
    "ID": 18,
    "STATUS": "ARCHIVE"
}
```

#### Response

```json
Success (200 OK):
{
    "message": "Employee account status updated successfully."
}
```

```json
Error (400 Bad Request):
{
    "errors": {
        "ID": "Employee ID is required.",
        "STATUS": "STATUS is required."
    }
}
Note: The exact error messages depend on which validations fail.
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to update employee account status. Please check the employee ID."
}
```

### 22. Fetch Total Patients Count

- **Endpoints:**
  - `GET /GET/SHARED/STATISTICS/patients.php`  
    - **Description:** Retrieve total count of patient and total count per gender.

#### Response

```json
Success (200 OK):
{
    "total_patients": "2",
    "gender_counts": {
        "Female": "1",
        "Male": "1"
    }
}
```

```json
Error (500 Internal Server Error):
{
    "message": "Failed to retrieve gender counts."
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
- **404 Not Found:** The requested resource could not be found. This may indicate that the resource does not exist or was not found.
- **500 Internal Server Error:** An error occurred on the server.

### Tips for Error Handling

- Ensure all request bodies are properly formatted as JSON.
- Check the API responses for error messages and status codes to debug issues.
- Validate input data before sending requests to avoid common errors.
