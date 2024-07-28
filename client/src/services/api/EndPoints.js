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
};

export default END_POINTS;
