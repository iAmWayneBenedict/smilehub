/* eslint-disable no-unused-vars */
import APIMethods from "../APIMethods";
import END_POINTS from "../EndPoints";
import { paramsFormatter } from "../utils";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class AuthStaffAPIManager {
	/**
	 * Sends a registration request to the register endpoint.
	 *
	 * @param {Object} [body={}] - The request body containing registration details.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const registerData = { NAME: 'user test', PASSWORD: 'pass', EMAIL: 'user@example.com' };
	 * const response = await AuthStaffAPIManager.register(registerData);
	 * console.log(response);
	 */
	static async register(body = {}) {
		return await APIMethods.post(END_POINTS.STAFF_REGISTER(), body);
	}
}

export default AuthStaffAPIManager;
