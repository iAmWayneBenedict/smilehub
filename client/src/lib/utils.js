import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

/**
 * Merges multiple class names into a single string using `clsx` and `twMerge`.
 *
 * @param {...any} inputs - The class names to merge.
 * @returns {string} - The merged class names.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Encrypts a given text using AES encryption.
 *
 * @param {string} text - The text to encrypt.
 * @returns {string} - The encrypted string.
 */
export function encrypt(text) {
	let encryptedToken = "";
	if (text) {
		const dataToEncrypt = JSON.stringify(text);
		encryptedToken = CryptoJS.AES.encrypt(
			dataToEncrypt,
			import.meta.env.VITE_ENCRYPT_KEY
		).toString();
	}
	return encryptedToken;
}

/**
 * Decrypts a given encrypted text using AES decryption.
 *
 * @param {string} text - The encrypted text to decrypt.
 * @returns {any} - The decrypted data, parsed from JSON.
 */
export function decrypt(text) {
	let decryptedToken = "";
	if (text) {
		const bytes = CryptoJS.AES.decrypt(text, import.meta.env.VITE_ENCRYPT_KEY);
		decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	}
	return decryptedToken;
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized.
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const sortTime = (timeArr, time) => {
	const isAM = time.includes("AM");
	const timeArrCopy = [...timeArr];
	const AMs = timeArrCopy.filter((t) => t.includes("AM"));
	const PMs = timeArrCopy.filter((t) => t.includes("PM"));
	const temp = [];
	if (isAM) {
		const unsorted = [];
		unsorted.push(...AMs, time);
		// sort times
		unsorted.sort(sortArray);

		temp.push(...unsorted, ...PMs);
	} else {
		const unsorted = [];
		unsorted.push(...PMs, time);
		// sort times
		unsorted.sort(sortArray);
	}

	function sortArray(a, b) {
		const aTime = a.split(" ")[0];
		const bTime = b.split(" ")[0];
		if (aTime === "12:00") return -1;
		if (bTime === "12:00") return 1;
		return aTime.localeCompare(bTime);
	}

	return temp;
};

export const getOrdinalSuffix = (day) => {
	if (day > 3 && day < 21) return "th";
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

export const getThisWeekMondayAndFriday = () => {
	const today = new Date();
	const day = today.getDay();
	const diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	const monday = new Date(today.setDate(diff));
	const friday = new Date(today.setDate(diff + 4));
	return {
		monday: {
			year: monday.getFullYear(),
			month: monday.getMonth(),
			day: monday.getDate(),
		},
		friday: {
			year: friday.getFullYear(),
			month: friday.getMonth(),
			day: friday.getDate(),
		},
	};
};

export function formatDate(date) {
	const options = { day: "2-digit", month: "long", year: "numeric" };
	const formattedDate = date.toLocaleDateString("en-PH", options);

	// Custom formatting to add a comma between day and month
	const dateParts = formattedDate.split(" ");
	return `${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`;
}
export const getISODateString = (dateString) => {
	const dateObject = new Date(dateString);
	return dateObject.toISOString()
}

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const timeDropdownList = [
	"8:00 AM - 9:00 AM",
	"9:00 AM - 10:00 AM",
	"10:00 AM - 11:00 AM",
	"11:00 AM - 12:00 PM",
	"1:00 PM - 2:00 PM",
	"2:00 PM - 3:00 PM",
	"3:00 PM - 4:00 PM",
	"4:00 PM - 5:00 PM",
];

export const purpose = [
	"Dental Bonding",
	"Teeth Whitening",
	"Dental Crowns",
	"Bridgework",
	"Invisalign",
	"Dentures",
	"Dental Sealants",
	"Tooth Extractions",
];

export const patientStatus = ["Completed", "Pending", "Cancelled"];
