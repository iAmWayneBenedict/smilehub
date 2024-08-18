/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class AppointmentsAPIManager {
	static async getAppointmentDates(body = {}) {
		return await APIMethods.post(END_POINTS.GET_APPOINTMENT_DATES(), body);
	}
	static async postPatientAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_PATIENT_APPOINTMENT(), body);
	}
	static async postSharedAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_SHARED_APPOINTMENT(), body);
	}
	static async getPatientAppointments(body = {}) {
		return await APIMethods.get(END_POINTS.GET_PATIENT_APPOINTMENTS(), body);
	}
	static async postRescheduleAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_RESCHEDULE_APPOINTMENT(), body);
	}
	static async postChangeStatusAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_CHANGE_STATUS_APPOINTMENT(), body);
	}
	static async postDeleteAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_DELETE_APPOINTMENT(), body);
	}
	static async getTodaysAppointment(body = {}) {
		return await APIMethods.post(END_POINTS.GET_TODAYS_APPOINTMENT(), body);
	}
}

export default AppointmentsAPIManager;
