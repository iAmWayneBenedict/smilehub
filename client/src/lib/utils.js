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
