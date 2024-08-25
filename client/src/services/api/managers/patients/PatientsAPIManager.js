/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class PatientsAPIManager {
	static async postAddPatient(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_PATIENT(), body);
	}
	static async getAllPatients(body = {}) {
		return await APIMethods.post(END_POINTS.GET_ALL_PATIENTS(), body);
	}
	static async getDetailPatient(body = {}) {
		return await APIMethods.post(END_POINTS.GET_DETAIL_PATIENT(), body);
	}
	static async getAppointmentPatient(body = {}) {
		return await APIMethods.get(END_POINTS.GET_APPOINTMENT_PATIENT(), body);
	}
	static async editAppointmentPatient(body = {}) {
		return await APIMethods.post(END_POINTS.POST_EDIT_PATIENT(), body);
	}
	static async postChangeStatusPatient(body = {}) {
		return await APIMethods.post(END_POINTS.POST_CHANGE_STATUS_PATIENT(), body);
	}
}

export default PatientsAPIManager;
