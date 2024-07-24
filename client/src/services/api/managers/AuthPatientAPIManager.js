/* eslint-disable no-unused-vars */
import APIMethods from "../APIMethods";
import END_POINTS from "../EndPoints";
import { paramsFormatter } from "../utils";
/**
 * A class that provides static methods for authentication-related API requests.
 */
class AuthPatientAPIManager {
	/**
	 * Sends a login request to the login endpoint.
	 *
	 * @param {Object} [body={}] - The request body containing login details.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const loginData = { name: 'user test', password: 'pass' };
	 * const response = await AuthPatientAPIManager.login(loginData);
	 * console.log(response);
	 */
	static async login(body = {}) {
		return await APIMethods.post(END_POINTS.LOGIN(), body);
	}

	/**
	 * Sends a registration request to the register endpoint.
	 *
	 * @param {Object} [body={}] - The request body containing registration details.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const registerData = { name: 'user test', password: 'pass', email: 'user@example.com' };
	 * const response = await AuthPatientAPIManager.register(registerData);
	 * console.log(response);
	 */
	static async register(body = {}) {
		return await APIMethods.post(END_POINTS.REGISTER(), body);
	}
}

export default AuthPatientAPIManager;