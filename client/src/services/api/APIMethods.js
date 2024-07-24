import axios from "axios";

/**
 * A class that provides static methods for making HTTP requests using axios.
 */
class APIMethods {
	/**
	 * Makes an API request using the provided parameters.
	 *
	 * @param {Object} params - The parameters for the API request.
	 * @param {string} params.method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
	 * @param {string} params.url - The URL for the API request.
	 * @param {Object} [params.data] - The data to be sent with the request (for 'POST' and 'PUT' requests).
	 * @param {Object} [params.headers] - The headers to be sent with the request.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 * @throws {Object} - Throws an error containing the response data if the request fails.
	 *
	 * @example
	 * try {
	 *     const response = await APIMethods.apiRequest({ method: 'GET', url: 'https://api.example.com/data' });
	 *     console.log(response);
	 * } catch (error) {
	 *     console.error(error);
	 * }
	 */
	static async apiRequest({ method, url, data, headers }) {
		try {
			const response = await axios({ method, url, data, headers });
			return response.data;
		} catch (error) {
			throw error.response.data;
		}
	}

	/**
	 * Makes a GET request to the specified URL.
	 *
	 * @param {string} url - The URL for the GET request.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const data = await APIMethods.get('https://api.example.com/data');
	 * console.log(data);
	 */
	static async get(url) {
		return await this.apiRequest({ method: "GET", url });
	}

	/**
	 * Makes a POST request to the specified URL with the provided data.
	 *
	 * @param {string} url - The URL for the POST request.
	 * @param {Object} data - The data to be sent with the POST request.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const response = await APIMethods.post('https://api.example.com/data', { key: 'value' });
	 * console.log(response);
	 */
	static async post(url, data) {
		return await this.apiRequest({ method: "POST", url, data });
	}

	/**
	 * Makes a PUT request to the specified URL with the provided data.
	 *
	 * @param {string} url - The URL for the PUT request.
	 * @param {Object} data - The data to be sent with the PUT request.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const response = await APIMethods.put('https://api.example.com/data/1', { key: 'value' });
	 * console.log(response);
	 */
	static async put(url, data) {
		return await this.apiRequest({ method: "PUT", url, data });
	}

	/**
	 * Makes a DELETE request to the specified URL.
	 *
	 * @param {string} url - The URL for the DELETE request.
	 * @returns {Promise<Object>} - A promise that resolves to the response data.
	 *
	 * @example
	 * const response = await APIMethods.delete('https://api.example.com/data/1');
	 * console.log(response);
	 */
	static async delete(url) {
		return await this.apiRequest({ method: "DELETE", url });
	}
}

export default APIMethods;
