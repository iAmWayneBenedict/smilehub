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
		return dateTime.toLocaleDateString("en-PH", options);
	}
	if (isTimeOnly) {
		return dateTime.toLocaleTimeString("en-PH", options);
	}
	return dateTime.toLocaleString("en-PH", options);
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

export const extractDateTime = (dateTimeString) => {
	// Parse the input date-time string
  const date = new Date(dateTimeString);

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear().toString();

  // Extract time components
  let hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Determine AM/PM and format hour
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = (hour % 12) || 12; // Convert to 12-hour format
  const formattedHour = hour.toString().padStart(2, '0');

  // Format the date string
  const dateStr = `${day}/${month}/${year}`;

  // Format the time string
  const timeStr = `${formattedHour}:${minutes} ${period}`;

  // Create date object
  const dateObject = {
    dateString: dateStr,
    day: day,
    month: month,
    year: year
  };

  // Create time object
  const timeObject = {
    timeString: timeStr,
    hour: formattedHour,
    minutes: minutes,
    period: period
  };

  return { dateObject, timeObject };
}
