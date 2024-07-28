/* eslint-disable no-unused-vars */
import APIMethods from "../APIMethods";
import END_POINTS from "../EndPoints";
import { paramsFormatter } from "../utils";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class AuthSharedAPIManager {
	/**
	 * Sends a login request to the login endpoint.
	 *
	 * @param {Object} [body={}] - The request body containing login details.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const loginData = { NAME: 'user test', PASSWORD: 'pass' };
	 * const response = await AuthSharedAPIManager.login(loginData);
	 * console.log(response);
	 */
	static async login(body = {}) {
		return await APIMethods.post(END_POINTS.SHARED_LOGIN(), body);
	}
}

export default AuthSharedAPIManager;
