/* eslint-disable no-unused-vars */

import { isWeekend } from "@internationalized/date";

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

/**
 * Converts a date string to a Date object.
 *
 * @param {Date} date - The date string to be converted.
 * @returns {Date} - The Date object converted from the input date string.
 *
 * @example
 * const date = "2021-10-01";
 * const dateObj = convertToDate(date);
 * console.log(dateObj); // Output: Date object
 */
export const convertDateYYYYMMDD = (date) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = `${d.getMonth() + 1}`.padStart(2, "0");
	const day = `${d.getDate()}`.padStart(2, "0");
	return `${year}-${month}-${day}`;
};

/**
 * Gets the current time in a 12-hour format with AM/PM.
 * @returns {Object} An object containing the current hours, minutes, seconds, and meridian (AM/PM).
 */
export const getTimeToday = () => {
	const now = new Date();

	let hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const meridian = hours >= 12 ? "PM" : "AM";

	// Convert hours from 24-hour format to 12-hour format
	hours = hours % 12 || 12; // `|| 12` handles the midnight case (0 => 12)

	return {
		hours,
		minutes,
		seconds,
		meridian,
	};
};

/**
 * Extracts the start and end time details from a given time range string.
 * @param {string} time - The time range string in the format "9:00 AM - 10:00 AM".
 * @returns {Object} An object containing the start and end time details.
 */
export const extractTime = (time) => {
	// time parameter format string is: "9:00 AM - 10:00 AM"
	if (!time) return;
	const timeArray = time.split(" - ");
	const startTime = timeArray[0];
	const endTime = timeArray[1];

	// Extract start and end time details
	const startHour = parseInt(startTime.split(":")[0]);
	const startMinute = parseInt(startTime.split(":")[1].split(" ")[0]);
	const startMeridian = startTime.split(" ")[1];

	// Extract end
	const endHour = parseInt(endTime.split(":")[0]);
	const endMinute = parseInt(endTime.split(":")[1].split(" ")[0]);
	const endMeridian = endTime.split(" ")[1];

	return {
		startTime: {
			hour: startHour,
			minute: startMinute,
			meridian: startMeridian,
		},
		endTime: {
			hour: endHour,
			minute: endMinute,
			meridian: endMeridian,
		},
	};
};

export const validateTimeStatus = (time) => {
	const { startTime, endTime } = extractTime(time);

	const now = getTimeToday();
	const { hours, minutes, meridian } = now;

	const startHour = startTime.hour;
	const startMinute = startTime.minute;
	const startMeridian = startTime.meridian;

	const endHour = endTime.hour;
	const endMinute = endTime.minute;
	const endMeridian = endTime.meridian;

	// Check if the current time is within the given time range
	if (meridian === "PM" && startMeridian === "AM") {
		return "inactive";
	}
	if (meridian === startMeridian) {
		if (hours === startHour) {
			return "active";
		} else if (hours > startHour) {
			if (startHour >= 8) return "inactive";
			return "upcoming";
		}
	}

	return "upcoming";
};
export const sortTimeWithMeridian = (timeArr) => {
	if (!timeArr.length) return [];
	const structuredTimeArr = timeArr.map((time) => {
		const { startTime, endTime } = extractTime(time.APPOINTMENT_TIME);

		const startHour = startTime.hour;
		const startMinute = startTime.minute;
		const startMeridian = startTime.meridian;

		return {
			startHour,
			startMinute,
			startMeridian,
			data: time,
		};
	});

	const sortFunc = (arr) =>
		arr.sort((a, b) => {
			// Convert AM/PM into 24-hour format for easier comparison
			const hourA =
				a.startMeridian === "PM" && a.startHour !== 12 ? a.startHour + 12 : a.startHour;
			const hourB =
				b.startMeridian === "PM" && b.startHour !== 12 ? b.startHour + 12 : b.startHour;

			// Compare by hour first
			if (hourA !== hourB) {
				return hourA - hourB;
			}

			// If hours are the same, compare by minutes
			return a.startMinute - b.startMinute;
		});
	const timesAM = structuredTimeArr.filter((time) => time.startMeridian === "AM");
	const sortedTimesAMArr = sortFunc(timesAM).map((item) => item.data);
	const timesPM = structuredTimeArr.filter((time) => time.startMeridian === "PM");
	const sortedTimesPMArr = sortFunc(timesPM).map((item) => item.data);

	return [...sortedTimesAMArr, ...sortedTimesPMArr];
};

/**
 * Defines the available clinic roles.
 * ! Update this array based on the available roles in the clinic.
 */
export const clinicRoles = [
	{ name: "Dentist", uid: "dentist" },
	{ name: "Assistant", uid: "assistant" },
	{ name: "Hygienist", uid: "hygienist" },
	{ name: "Receptionist", uid: "receptionist" },
	{ name: "Lab Technician", uid: "lab_technician" },
];

export const employeeRoles = [
	{ name: "STAFF", uid: "staff" },
	{ name: "ADMIN", uid: "admiin" },
];

export const isWeekEndDate = (date) => {
	return isWeekend(date, "en-PH");
};
