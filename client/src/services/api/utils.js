/* eslint-disable no-unused-vars */
/**
 * Formats the given parameters into a query string.
 *
 * @param {(Object|string)} params - The parameters to be formatted. It can be an object or a string.
 * @returns {string} - The formatted query string. If the input is an object, it converts it to a query string using `queryHandler`. If it's a string, it extracts the query part.
 *
 * @example
 * // If params is an object
 * const params = { foo: 'bar', baz: 'qux' };
 * const queryString = paramsFormatter(params);
 * console.log(queryString); // Output: 'foo=bar&baz=qux'
 *
 * @example
 * // If params is a string
 * const params = 'http://example.com?page=1&sort=asc';
 * const queryString = paramsFormatter(params);
 * console.log(queryString); // Output: 'page=1&sort=asc'
 */
export const paramsFormatter = (params) => {
	let query = "";
	if (typeof params == "object" && Object.keys(params).length) query = queryHandler(params);
	else if (typeof params == "string") query = params.split("?")[1];

	return query;
};

/**
 * Converts an object into a URL query string.
 *
 * @param {Object} queryObj - The object containing key-value pairs to be converted into a query string.
 * @returns {string} - The URL query string generated from the input object.
 *
 * @example
 * const queryObj = { foo: 'bar', baz: 'qux' };
 * const queryString = queryHandler(queryObj);
 * console.log(queryString); // Output: 'foo=bar&baz=qux'
 */
export const queryHandler = (queryObj) => {
	const query = new URLSearchParams(queryObj);
	return query.toString();
};
