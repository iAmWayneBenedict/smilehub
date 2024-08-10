/* eslint-disable no-unused-vars */
/**
 * insert variable in the property of the object to provide parameterized values
 * @example
 * USERS: (params) => `/users/${params.id}`
 */

/**
 * @description This file contains all the endpoints of the API
 * @name EndPoints
 * @type {Object}
 *
 */

const END_POINTS = {
	// Auth

	// register
	PATIENT_REGISTER: () => "/POST/PATIENT/register.php",
	STAFF_REGISTER: () => "/POST/STAFF/register.php",
	ADMIN_REGISTER: () => "/POST/ADMIN/register.php",

	// login
	PATIENT_LOGIN: () => "/POST/PATIENT/login.php",
	SHARED_LOGIN: () => "/POST/SHARED/login.php",

	// get appointment dates
	GET_APPOINTMENT_DATES: () => "/GET/SHARED/APPOINTMENT/availableTime.php",
	POST_PATIENT_APPOINTMENT: () => "/POST/PATIENT/appointment.php",
	POST_SHARED_APPOINTMENT: () => "/POST/SHARED/appointment.php",

	// get patients
	GET_ALL_PATIENTS: () => "/GET/SHARED/PATIENT/patients.php",
};

export default END_POINTS;
