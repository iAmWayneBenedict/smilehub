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
}

export default AppointmentsAPIManager;
