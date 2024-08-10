/* eslint-disable no-unused-vars */
import APIMethods from "../../APIMethods";
import END_POINTS from "../../EndPoints";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class PatientsAPIManager {
	static async getAllPatients(body = {}) {
		return await APIMethods.post(END_POINTS.GET_ALL_PATIENTS(), body);
	}
}

export default PatientsAPIManager;
