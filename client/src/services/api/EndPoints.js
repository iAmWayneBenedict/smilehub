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
	GET_PATIENT_APPOINTMENTS: () => "/GET/SHARED/APPOINTMENT/appointments.php",
	POST_RESCHEDULE_APPOINTMENT: () => "/EDIT/SHARED/APPOINTMENT/reschedule.php",
	POST_CHANGE_STATUS_APPOINTMENT: () => "/EDIT/SHARED/APPOINTMENT/changeStatus.php",
	POST_DELETE_APPOINTMENT: () => "/DELETE/SHARED/APPOINTMENT/appointment.php",
	GET_TODAYS_APPOINTMENT: () => "/GET/SHARED/APPOINTMENT/appointmentsByDate.php",

	// get patients
	GET_ALL_PATIENTS: () => "/GET/SHARED/PATIENT/patients.php",
	POST_ADD_PATIENT: () => "/POST/SHARED/patient.php",
	POST_EDIT_PATIENT: () => "/EDIT/SHARED/PATIENT/patient.php",
	POST_CHANGE_STATUS_PATIENT: () => "/EDIT/SHARED/PATIENT/changeStatus.php",
	GET_DETAIL_PATIENT: () => "/GET/SHARED/PATIENT/patient.php",
	GET_APPOINTMENT_PATIENT: () => "/GET/SHARED/PATIENT/patientsWithAppointment.php",
};

export default END_POINTS;
