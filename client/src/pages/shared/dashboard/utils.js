import { extractTime } from "@/services/api/utils";

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized.
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a date object into a string based on the provided options.
 *
 * @param {Object} params - The parameters for formatting the date and time.
 * @param {boolean} params.isDateOnly - If true, returns only the date part.
 * @param {boolean} params.isTimeOnly - If true, returns only the time part.
 * @param {Date|string|number} params.date - The date to format. Can be a Date object, ISO string, or timestamp.
 * @returns {string} - The formatted date and/or time string.
 */
export function getDateTime({ isDateOnly, isTimeOnly, date }) {
	const dateTime = new Date(date);
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	};
	if (isDateOnly) {
		return dateTime.toLocaleDateString("en-US", options);
	}
	if (isTimeOnly) {
		return dateTime.toLocaleTimeString("en-US", options);
	}
	return dateTime.toLocaleString("en-US", options);
}

export function formatTimeAccordionData(appointments) {
	const timesArray = [];
	appointments.forEach((appointment) => {
		const { startTime } = extractTime(appointment.APPOINTMENT_TIME);
		const firstTime = `${startTime?.hour}:${
			startTime?.minute < 10 ? "0" + startTime?.minute : startTime?.minute
		}`;
		if (timesArray.some((timeObj) => timeObj.time === firstTime)) {
			const index = timesArray.findIndex((timeObj) => timeObj.time === firstTime);
			timesArray[index].appointments.push(appointment);
			return;
		}
		const timeObj = {
			time: firstTime,
			appointments: appointment ? [appointment] : [],
		};
		timesArray.push(timeObj);
	});

	return timesArray;
}
