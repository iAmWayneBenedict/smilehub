/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class DashboardAPIManager {
	static async getTotalPatientsStatistics(body = {}) {
		return await APIMethods.post(END_POINTS.GET_TOTAL_PATIENTS_STATISTICS(), body);
	}
	static async getPatientVisits(body = {}) {
		return await APIMethods.post(END_POINTS.GET_PATIENT_VISITS(), body);
	}
}

export default DashboardAPIManager;
