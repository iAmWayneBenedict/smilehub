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
	static async editAppointmentPatientPassword(body = {}) {
		return await APIMethods.post(END_POINTS.POST_EDIT_PATIENT_PASSWORD(), body);
	}
	static async postChangeStatusPatient(body = {}) {
		return await APIMethods.post(END_POINTS.POST_CHANGE_STATUS_PATIENT(), body);
	}

	static async getDiagram(body = {}) {
		return await APIMethods.post(END_POINTS.GET_DIAGRAM(), body);
	}
	static async postAddDiagram(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_DIAGRAM(), body);
	}
	static async getAssessment(body = {}) {
		return await APIMethods.post(END_POINTS.GET_ASSESSMENT(), body);
	}
	static async postAddAssessment(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_ASSESSMENT(), body);
	}
	static async postAddProgressNote(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_PROGRESS_NOTE(), body);
	}
	static async getProgressNotes(body = {}) {
		return await APIMethods.post(END_POINTS.GET_PROGRESS_NOTES(), body);
	}
	static async postUpdateProgressNotes(body = {}) {
		return await APIMethods.post(END_POINTS.POST_UPDATE_PROGRESS_NOTES(), body);
	}
	static async postDeleteProgressNotes(body = {}) {
		return await APIMethods.post(END_POINTS.POST_DELETE_PROGRESS_NOTES(), body);
	}
	static async getPatientForm(body = {}) {
		return await APIMethods.post(END_POINTS.POST_GET_PATIENT_FORM(), body);
	}
	static async postAddPatientForm(body = {}) {
		return await APIMethods.post(END_POINTS.POST_ADD_PATIENT_FORM(), body);
	}
	static async postEditPatientForm(body = {}) {
		return await APIMethods.post(END_POINTS.POST_EDIT_PATIENT_FORM(), body);
	}
}

export default PatientsAPIManager;
