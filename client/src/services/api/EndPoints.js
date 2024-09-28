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
	ADMIN_REGISTER: () => "/POST/DENTIST/register.php",

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

	// employees
	POST_ADD_EMPLOYEE: () => "/POST/DENTIST/dentist.php",
	GET_ALL_EMPLOYEE: () => "/GET/SHARED/EMPLOYEE/employees.php",
	POST_CHANGE_EMPLOYEE_STATUS: () => "/EDIT/SHARED/EMPLOYEE/changeStatus.php",
	GET_EMPLOYEE_DETAILS: () => "/GET/SHARED/DENTIST/dentist.php",
	POST_UPDATE_EMPLOYEE: () => "/EDIT/SHARED/DENTIST/dentist.php",
	POST_UPDATE_PASSWORD: () => "/EDIT/SHARED/PASSWORD/password.php",

	// statistics
	GET_TOTAL_PATIENTS_STATISTICS: () => "/GET/SHARED/STATISTICS/patients.php",
	GET_PATIENT_VISITS: () => "/GET/SHARED/STATISTICS/VISITS.php",

	// tasks
	POST_ADD_NEW_TASK: () => "/POST/SHARED/task.php",
	POST_EDIT_TASK: () => "/EDIT/SHARED/TASK/task.php",
	POST_DELETE_TASK: () => "/DELETE/SHARED/TASK/task.php",
	GET_TASK: () => "/GET/SHARED/TASK/task.php",
	GET_TASKS: (params) => "/GET/SHARED/TASK/tasks.php?" + params,

	// inventory
	GET_INVENTORY_ITEMS: () => "/GET/SHARED/INVENTORY/inventoryItems.php",
	GET_INVENTORY_ITEM: () => "/GET/SHARED/INVENTORY/inventoryItem.php",
	GET_INVENTORY_GROUPS: () => "/GET/SHARED/INVENTORY/inventoryItemsGroup.php",
	GET_INVENTORY_GROUPS_WITH_QUANTITY: () =>
		"/GET/SHARED/INVENTORY/inventoryItemsGroupWithQuantity.php",
	POST_ADD_ITEM: () => "/POST/SHARED/inventoryItem.php",
	POST_DELETE_ITEM: () => "/DELETE/SHARED/INVENTORY/inventoryItem.php",
	POST_UPDATE_ITEM: () => "/EDIT/SHARED/INVENTORY/inventoryItem.php",
	POST_ADD_GROUP: () => "/POST/SHARED/inventoryItemGroup.php",
	POST_DELETE_GROUP: () => "/DELETE/SHARED/INVENTORY/inventoryItemGroup.php",

	// teeth diagram
	POST_ADD_DIAGRAM: () => "/POST/DENTIST/teethAssessment.php",
	POST_ADD_ASSESSMENT: () => "/POST/DENTIST/assessment.php",
	GET_DIAGRAM: () => "/GET/DENTIST/teethAssessment.php",
	GET_ASSESSMENT: () => "/GET/DENTIST/assessment.php",
};

export default END_POINTS;
